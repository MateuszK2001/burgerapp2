import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import { Ingredients } from '../../../containers/BurgerBuilder/BurgerBuilder';
import Button from '../../UI/Button/Button';

interface Props {
    ingredients: Ingredients;
    checkoutCancelled: ()=>void;
    checkoutContinued: ()=>void;
}

const CheckoutSummary =  (props: Props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType='Danger'
                clicked={props.checkoutCancelled}>
                    CANCEL
            </Button>
            <Button
                btnType='Success'
                clicked={props.checkoutContinued}>
                    CONTINUE
            </Button>
        </div>
    )
};

export default CheckoutSummary;