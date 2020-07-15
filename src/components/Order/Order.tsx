import React from 'react';
import classes from './Order.module.css';
import { ingredientsLabels } from '../../containers/BurgerBuilder/BurgerBuilder';
import { Ingredients } from "../../store/types/Ingredients";

interface Props {
    ingredients: Ingredients;
    price: number;
}

const Order = (props: Props) => (
    <div className={classes.Order}>
        Ingredients: {
            Object.entries(props.ingredients).map(([type, cnt], id) => (
                <span
                    key={id}
                    style={{ 
                        textTransform: 'capitalize', 
                        display: 'inline-block', 
                        margin: '0 8px', 
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}>
                    {
                        `${ingredientsLabels.find(a => a.type === type)?.label} (${cnt})`
                    }
                </span>
            ))
        }
        <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
);

export default Order;