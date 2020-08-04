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
import burgerActions from '../../store/actions/burgerActions';
import { MergedState } from '.././../index';
import { ordersActions } from '../../store/actions/ordersActions';
import { authActions } from '../../store/actions/authActions';

export const ingredientsLabels: { label: string, type: keyof Ingredients }[] = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

export interface Props {
    ingredients: Ingredients;
    fetchIngredients: () => Promise<void>;
    addIngredient: (ingredientType: keyof Ingredients) => void;
    removeIngredient: (ingredientType: keyof Ingredients) => void;
    purchasable: boolean;
    price: number;
    purchaseInit: () => void;
    isAuthenticated: boolean;
    setRedirectPath: (path: string) => void;
}


const INGREDIENT_NAMES = [
    'salad', 'bacon', 'cheese', 'meat'
];
type IngredientBoolean = { [key in keyof Ingredients]: boolean };

const BurgerBuilder = (props: Props) => {
    const ingredients = props.ingredients;
    const purchasable = props.purchasable;
    const price = props.price;
    const fetchIngredients = useCallback(props.fetchIngredients, []);
    const addIngredient = useCallback(props.addIngredient, []);
    const removeIngredient = useCallback(props.removeIngredient, []);
    const [purchasing, purchasingUpdate] = useState(false);
    const [fetchingIngredients, fetchingIngredientsUpdate] = useState(true);
    const [canRemoveIngredient, canRemoveIngredientUpdate] = useState(
        Object.fromEntries(INGREDIENT_NAMES
            .map(name => [name, false])) as IngredientBoolean
    );


    const history = useHistory();

    useEffect(() => { /// lessBtn dis/enabling
        const copy = Object.fromEntries(INGREDIENT_NAMES.map(name => [name, false])) as IngredientBoolean;
        for (const name in ingredients) {
            const cnt = ingredients[name as keyof Ingredients];
            copy[name as keyof Ingredients] = cnt >= 1;
        }
        canRemoveIngredientUpdate(copy);
    }, [ingredients]);

    const { purchaseInit } = props;
    useEffect(() => {
        purchaseInit();
    }, [purchaseInit]);

    useEffect(() => {
        fetchIngredients()
            .then(() => {
                fetchingIngredientsUpdate(false);
            });
    }, [fetchIngredients]);

    const purchaseCanceledHandler = () => {
        purchasingUpdate(false);
    }
    const purchaseContinueHandler = () => {
        purchasingUpdate(false);
        history.push({
            pathname: '/checkout',
        });
    }


    const orderBtnClicked = () => {
        if (props.isAuthenticated) {
            purchasingUpdate(true);
        }
        else {
            props.setRedirectPath('/checkout');
            history.push({
                pathname: '/auth'
            })
        }
    };


    const setRedirectPath = props.setRedirectPath;
    useEffect(() => {
        setRedirectPath('/');
    }, [setRedirectPath]);

    let BurgerJsx = <Spinner />;

    if (!fetchingIngredients) {
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
                    isAuthenticated={props.isAuthenticated}
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

const stateToProps = (state: MergedState) => {
    return {
        ingredients: state.burger.ingredients,
        purchasable: state.burger.purchasable,
        price: state.burger.price,
        isAuthenticated: state.auth.token !== null
    }
};
const dispatchToProps = (dispatch: any) => {
    return {
        fetchIngredients: () => dispatch(burgerActions.fetchIngredients()),
        addIngredient: (ingredientType: keyof Ingredients) => dispatch(burgerActions.addIngredient(ingredientType)),
        removeIngredient: (ingredientType: keyof Ingredients) => dispatch(burgerActions.removeIngredient(ingredientType)),
        purchaseInit: () => dispatch(ordersActions.purchaseInit()),
        setRedirectPath: (path: string) => dispatch(authActions.setRedirectPath(path))
    };
};

export {BurgerBuilder as _BurgerBuilder};
export default withErrorHandler(connect(stateToProps, dispatchToProps)(BurgerBuilder), AxiosOrders);