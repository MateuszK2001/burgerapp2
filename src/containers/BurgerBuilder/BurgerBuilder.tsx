import React, {Fragment, useState} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

export interface Ingredients{
    salad: Number;
    bacon: Number;
    cheese: Number;
    meat: Number;
}

export interface Props{

}

const BurgerBuilder = (props:Props)=>{
    const [ingredients, ingredientsUpdate] = useState(
        {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        });
    return  (
        <Fragment>
            <Burger ingredients={ingredients}/>
            <BuildControls />
        </Fragment>
    );
}
    

    
export default BurgerBuilder;