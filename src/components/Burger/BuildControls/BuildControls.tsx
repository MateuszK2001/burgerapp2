import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import { Ingredients } from "../../../store/types/Ingredients";
import {ingredientsLabels} from '../../../containers/BurgerBuilder/BurgerBuilder';


type IngredientsBool = { [key in keyof Ingredients]: boolean };


export interface Props{
    moreClicked: (what: 'meat' | 'cheese' | 'salad' | 'bacon')=>void;
    lessClicked: (what: 'meat' | 'cheese' | 'salad' | 'bacon')=>void;
    canRemoveIngredient: IngredientsBool;
    price: number;
    purchasable: boolean;
    purchasingHandler: ()=>void;
}



const buildControls = (props :Props)=>(
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            ingredientsLabels.map(ctrl =>{
                return <BuildControl key={ctrl.type} 
                    label={ctrl.label} 
                    moreClicked={props.moreClicked.bind(null, ctrl.type)} 
                    lessClicked={props.lessClicked.bind(null, ctrl.type)}
                    canRemoveIngredient={props.canRemoveIngredient[ctrl.type]} 
                    />;
            })
        }
        <button 
        onClick={props.purchasingHandler}
        className={classes.OrderButton} 
        disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;