import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {Ingredients} from '../../containers/BurgerBuilder/BurgerBuilder'; 
export interface Props{
    ingredients: Ingredients;
}

const burger = (props:Props) => {
    const ingredientsTransformed = Object.entries(props.ingredients) as ['meat' | 'cheese' | 'salad' | 'bacon', Number][];
    let data:JSX.Element|JSX.Element[] = ingredientsTransformed
        .map( ([name, cnt]) => [...Array(cnt)]
            .map( (_, id) => <BurgerIngredient key={`${name}${cnt}`} type={name} />))
            .reduce((a, b)=>{
                return a = a.concat(b);
            });
    if(data.length === 0){
        data = <div>Wybierz składniki</div>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {data}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;