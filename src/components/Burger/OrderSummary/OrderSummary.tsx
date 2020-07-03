import React, {Fragment} from 'react';
import {Ingredients} from '../../../containers/BurgerBuilder/BurgerBuilder';
import {ingredientsLabels} from '../../../containers/BurgerBuilder/BurgerBuilder';
import Button from '../../UI/Button/Button';

interface Props{
    ingredients: Ingredients;
    purchaseContinue: ()=>void;
    purchaseAborted: ()=>void;
    price: number;
}

const orderSummary = (props:Props)=>{
    const ingredientSummary = Object.entries(props.ingredients).map(([key, value], id)=>{
        return (
            <li key={id}>
                <span style={{textTransform: 'capitalize'}}>
                    {ingredientsLabels.find(a=>a.type === key)?.label}</span>: {value}  
            </li>);
    });
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}   
            </ul>
    <p><strong>Total Price: </strong>{props.price.toFixed(2)}</p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseAborted}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </Fragment>
    )
};

export default orderSummary;