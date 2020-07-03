import React, {Fragment, useState} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components//Burger/OrderSummary/OrderSummary';

export interface Ingredients{
    salad: Number;
    bacon: Number;
    cheese: Number;
    meat: Number;
}

export const ingredientsLabels:{label: string, type: keyof Ingredients}[] = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

export interface Props{

}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const BurgerBuilder = (props:Props)=>{
    const [ingredients, ingredientsUpdate] = useState(
        {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        });
    const [totalPrice, totalPriceUpdate] = useState(0);
    const [purchasable, purchasableUpdate] = useState(false);
    const [purchasing, purchasingUpdate] = useState(false);
    
    const [canRemoveIngredient, canRemoveIngredientUpdate] = useState(
        Object.fromEntries(Object.keys(ingredients).map(name => [name, false])) as { [key in keyof Ingredients]: boolean }
    );
    
    const updatePriceState = (newIngredients:Ingredients)=>{
        let newPrice = 0;
        Object.entries(newIngredients).forEach(([key, cnt]:[string, number])=>{
            newPrice += (INGREDIENT_PRICES[key as keyof Ingredients]*cnt);
        });
        totalPriceUpdate(newPrice);
    }
    const updateIngredientLessEnabling = (type:keyof Ingredients, cnt:Number)=>{
        const copy = {...canRemoveIngredient};
        if(cnt === 0 || cnt === 1){
            copy[type] = cnt === 1;
                canRemoveIngredientUpdate(copy);
        }     
    }
    const updatePurchasableState = (newIngredients:Ingredients)=>{
        const amount = Object.values(newIngredients).reduce((a, b)=>{
            return a+b;
        }, 0);
        purchasableUpdate(amount > 0);
    }

    const orderBtnClicked = () =>{
        purchasingUpdate(true);   
    };


    const lessClicked = (what:keyof Ingredients)=>{
        const copy = {...ingredients};
        copy[what] = Math.max(ingredients[what]-1, 0); 
        ingredientsUpdate(copy);
        updatePriceState(copy); 
        updateIngredientLessEnabling(what, copy[what]);
        updatePurchasableState(copy);
    };
    const moreClicked = (what:keyof Ingredients)=>{
        const copy = {...ingredients};
        copy[what] = ingredients[what]+1; 
        ingredientsUpdate(copy);
        updatePriceState(copy); 
        updateIngredientLessEnabling(what, copy[what]);
        updatePurchasableState(copy);
    };
    const purchaseCanceledHandler=()=>{
        purchasingUpdate(false);
    }
    const purchaseContinueHandler=()=>{
        // purchasingUpdate(false);
        alert("You continue!");
    }
    return  (
        <Fragment>
            <Modal show={purchasing} modalClosed={purchaseCanceledHandler} >
                <OrderSummary 
                    ingredients={ingredients} 
                    purchaseAborted={purchaseCanceledHandler}
                    purchaseContinue={purchaseContinueHandler}
                    price={totalPrice} />
            </Modal>
            <Burger ingredients={ingredients}/>
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
    

    
export default BurgerBuilder;