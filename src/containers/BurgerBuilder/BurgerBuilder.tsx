import React, { Fragment, useState, useEffect, useCallback } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components//Burger/OrderSummary/OrderSummary';
import AxiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Ingredients } from "../../store/types/Ingredients";
import { State } from '../../store/reducer';
import Actions from '../../store/actions';

export const ingredientsLabels: { label: string, type: keyof Ingredients }[] = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

export interface Props {
    ingredients:Ingredients;
    setIngredients: (ingredients:Ingredients)=>void;
    addIngredient: (ingredientType:keyof Ingredients) => void;
    removeIngredient: (ingredientType:keyof Ingredients) => void;
    purchasable: boolean;
    price: number;
    
}


const INGREDIENT_NAMES = [
    'salad', 'bacon', 'cheese', 'meat'
];
type IngredientBoolean = { [key in keyof Ingredients]: boolean };

const BurgerBuilder = (props: Props) => {
    const ingredients = props.ingredients;
    const purchasable = props.purchasable;
    const price = props.price;
    const setIngredients = useCallback(props.setIngredients, []);
    const addIngredient = useCallback(props.addIngredient, []);
    const removeIngredient = useCallback(props.removeIngredient, []);

    const [purchasing, purchasingUpdate] = useState(false);
    const [canRemoveIngredient, canRemoveIngredientUpdate] = useState(
        Object.fromEntries(INGREDIENT_NAMES
            .map(name => [name, false])) as IngredientBoolean
    );
    const history = useHistory();

    useEffect(()=>{ /// lessBtn dis/enabling
        const copy = Object.fromEntries(INGREDIENT_NAMES.map(name => [name, false])) as IngredientBoolean;
        for(const name in ingredients){
            const cnt = ingredients[name as keyof Ingredients];
            copy[name as keyof Ingredients] = cnt >= 1;
        }
        canRemoveIngredientUpdate(copy);
    }, [ingredients]);


    useEffect(() => {
        AxiosOrders.get('/ingredients.json')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(err=>{})
    }, [setIngredients]);

    const purchaseCanceledHandler = () => {
        purchasingUpdate(false);
    }
    const purchaseContinueHandler = () => {
        // loadingUpdate(false);
        purchasingUpdate(false);
        // const queryParams=Object.entries(ingredients as Ingredients).map(([key, val])=>{
        //     return encodeURIComponent(key)+"="+encodeURIComponent(val);
        // })
        // queryParams.push('price='+price);

        history.push({
            pathname: '/checkout',
            // search: '?'+queryParams.join('&')
        });
        // loadingUpdate(true);
        // purchasingUpdate(false);
    }
    

    const orderBtnClicked = () => {
        purchasingUpdate(true);
    };
    
    

    let BurgerJsx = <Spinner />;

    if (ingredients !== null) {
        const lessClicked = (what: keyof Ingredients) => {
            removeIngredient(what);
        };
        const moreClicked = (what: keyof Ingredients) => {
            addIngredient(what);
        };

        BurgerJsx = (
            <Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls
                    lessClicked={lessClicked}
                    moreClicked={moreClicked}
                    canRemoveIngredient={canRemoveIngredient}
                    price={price}
                    purchasable={purchasable}
                    purchasingHandler={orderBtnClicked} />
            </Fragment>
        );
    }

    

    return (
        <Fragment>
            <Modal show={purchasing} modalClosed={purchaseCanceledHandler} >
                <OrderSummary
                    ingredients={ingredients}
                    purchaseAborted={purchaseCanceledHandler}
                    purchaseContinue={purchaseContinueHandler}
                    price={price} />
            </Modal>
            {BurgerJsx}
        </Fragment>
    );
}

const stateToProps=(state:State)=>{
    return{
        ingredients: state.ingredients,
        purchasable: state.purchasable,
        price: state.price
    }
};
const dispatchToProps=(dispatch:any)=>{
    return{
        setIngredients: (ingredients:Ingredients) => dispatch({type: Actions.SET_INGREDIENTS, ingredients:ingredients}),
        addIngredient: (ingredientType:keyof Ingredients) => dispatch({type: Actions.ADD_INGREDIENT, ingredientType:ingredientType}),
        removeIngredient: (ingredientType:keyof Ingredients) => dispatch({type: Actions.REMOVE_INGREDIENT, ingredientType:ingredientType}),
    };
}

export default connect(stateToProps, dispatchToProps)(withErrorHandler(BurgerBuilder, AxiosOrders));