import React, { Fragment, useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components//Burger/OrderSummary/OrderSummary';
import AxiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
    useEffect(() => {
        AxiosOrders.get('/ingredients')
            .then(response => {
                ingredientsUpdate(response.data);
                console.log(response.data);
            })
            .catch(err=>{})
    }, []);

    const purchaseCanceledHandler = () => {
        purchasingUpdate(false);
    }
    const purchaseContinueHandler = () => {
        loadingUpdate(true);
        const order = {
            ingredients: ingredients,
            price: totalPrice,
            customer: {
                name: 'Mateusz Kisiel',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '43300',
                    country: 'Poland'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        AxiosOrders.post('/oders.json', order)
            .then(response => {
                console.log(response);
                loadingUpdate(false);
                purchasingUpdate(false);
            })
            .catch((err) => {
                console.log(err);
                loadingUpdate(false);
                purchasingUpdate(false);
            });

        // purchasingUpdate(false);
        // alert("You continue!");
    }
    const updatePurchasableState = (newIngredients: Ingredients) => {
        const amount = Object.values(newIngredients).reduce((a, b) => {
            return a + b;
        }, 0);
        purchasableUpdate(amount > 0);
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
    const updateIngredientLessEnabling = (type: keyof Ingredients, cnt: Number) => {
        const copy = { ...canRemoveIngredient };
        if (cnt === 0 || cnt === 1) {
            copy[type] = cnt === 1;
            canRemoveIngredientUpdate(copy);
        }
    }

    let OrderSummaryJsx = <Spinner />;
    let BurgerJsx = <Spinner />;

    if (ingredients !== null) {
        const lessClicked = (what: keyof Ingredients) => {
            const copy = { ...ingredients };
            copy[what] = Math.max(ingredients[what] - 1, 0);
            ingredientsUpdate(copy);
            updatePriceState(copy);
            updateIngredientLessEnabling(what, copy[what]);
            updatePurchasableState(copy);
        };
        const moreClicked = (what: keyof Ingredients) => {
            const copy = { ...ingredients };
            copy[what] = ingredients[what] + 1;
            ingredientsUpdate(copy);
            updatePriceState(copy);
            updateIngredientLessEnabling(what, copy[what]);
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