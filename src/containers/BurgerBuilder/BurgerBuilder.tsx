import React, { Fragment, useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components//Burger/OrderSummary/OrderSummary';
import AxiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useHistory } from 'react-router-dom';

export interface Ingredients {
    salad: number;
    bacon: number;
    cheese: number;
    meat: number;
}

export const ingredientsLabels: { label: string, type: keyof Ingredients }[] = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

export interface Props {

}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const BurgerBuilder = (props: Props) => {

    const [ingredients, ingredientsUpdate] = useState(null as Ingredients | null);
    const [totalPrice, totalPriceUpdate] = useState(0);
    const [purchasable, purchasableUpdate] = useState(false);
    const [purchasing, purchasingUpdate] = useState(false);
    const [isSummaryLoading, loadingUpdate] = useState(false);
    const [canRemoveIngredient, canRemoveIngredientUpdate] = useState(
        Object.fromEntries(Object.keys(INGREDIENT_PRICES)
            .map(name => [name, false])) as { [key in keyof Ingredients]: boolean }
    );
    const history = useHistory();
    
    const updateIngredientLessEnabling = (ingredients: Ingredients) => {
        const copy = { ...canRemoveIngredient };
        for(const name in ingredients){
            const cnt = ingredients[name as keyof Ingredients];
            if (cnt === 0 || cnt === 1) {
                copy[name as keyof Ingredients] = cnt === 1;
            }
        }
        canRemoveIngredientUpdate(copy);
    }
    const updatePurchasableState = (newIngredients: Ingredients) => {
        const amount = Object.values(newIngredients).reduce((a, b) => {
            return a + b;
        }, 0);
        purchasableUpdate(amount > 0);
    }
    useEffect(() => {
        AxiosOrders.get('/ingredients.json')
            .then(response => {
                ingredientsUpdate(response.data);
                updateIngredientLessEnabling(response.data);
                updatePurchasableState(response.data);
                console.log(response.data);
            })
            .catch(err=>{})
    }, []);

    const purchaseCanceledHandler = () => {
        purchasingUpdate(false);
    }
    const purchaseContinueHandler = () => {
        // loadingUpdate(false);
        purchasingUpdate(false);
        const queryParams=Object.entries(ingredients as Ingredients).map(([key, val])=>{
            return encodeURIComponent(key)+"="+encodeURIComponent(val);
        })
        queryParams.push('price='+totalPrice);

        history.push({
            pathname: '/checkout',
            search: '?'+queryParams.join('&')
        });
        // loadingUpdate(true);
        // purchasingUpdate(false);
        // alert("You continue!");
    }
    

    const orderBtnClicked = () => {
        purchasingUpdate(true);
    };
    const updatePriceState = (newIngredients: Ingredients) => {
        let newPrice = 0;
        Object.entries(newIngredients).forEach(([key, cnt]: [string, number]) => {
            newPrice += (INGREDIENT_PRICES[key as keyof Ingredients] * cnt);
        });
        totalPriceUpdate(newPrice);
    }
    

    let OrderSummaryJsx = <Spinner />;
    let BurgerJsx = <Spinner />;

    if (ingredients !== null) {
        const lessClicked = (what: keyof Ingredients) => {
            const copy = { ...ingredients };
            copy[what] = Math.max(ingredients[what] - 1, 0);
            ingredientsUpdate(copy);
            updatePriceState(copy);
            updateIngredientLessEnabling(copy);
            updatePurchasableState(copy);
        };
        const moreClicked = (what: keyof Ingredients) => {
            const copy = { ...ingredients };
            copy[what] = ingredients[what] + 1;
            ingredientsUpdate(copy);
            updatePriceState(copy);
            updateIngredientLessEnabling(copy);
            updatePurchasableState(copy);
        };

        if (!isSummaryLoading) {
            OrderSummaryJsx = (
                <OrderSummary
                    ingredients={ingredients}
                    purchaseAborted={purchaseCanceledHandler}
                    purchaseContinue={purchaseContinueHandler}
                    price={totalPrice} />
            );
        }
        BurgerJsx = (
            <Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls
                    lessClicked={lessClicked}
                    moreClicked={moreClicked}
                    canRemoveIngredient={canRemoveIngredient}
                    price={totalPrice}
                    purchasable={purchasable}
                    purchasingHandler={orderBtnClicked} />
            </Fragment>
        );
    }

    

    return (
        <Fragment>
            <Modal show={purchasing} modalClosed={purchaseCanceledHandler} >
                {OrderSummaryJsx}
            </Modal>
            {BurgerJsx}
        </Fragment>
    );
}



export default withErrorHandler(BurgerBuilder, AxiosOrders);