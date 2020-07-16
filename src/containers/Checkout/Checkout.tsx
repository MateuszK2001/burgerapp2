import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Ingredients } from "../../store/types/Ingredients";
import { useHistory, useLocation, Route, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { State } from '../../store/reducers/reducer1';
import ActionTypes from '../../store/actions/actionTypes';
//import classes from'./Checkout.module.css';

interface Props{
    ingredients:Ingredients;
    setIngredients:(ingredients:Ingredients)=>void;
}
const Checkout = (props:Props&RouteComponentProps)=>{
    const history = useHistory();
    const location = useLocation();
    const ingredients = props.ingredients;
    // const setIngredients = useCallback(props.setIngredients, []);
    
    // useEffect(()=>{
    //     const query = new URLSearchParams(location.search);
    //     const ingredientsNew = {
    //         bacon: 0,
    //         cheese: 0,
    //         meat: 0,
    //         salad: 0
    //     };
    //     for(const [key, val] of query.entries()){
    //         if(key === 'price'){
    //             priceUpdate(Number(val));
    //         }
    //         else{
    //             ingredientsNew[key as keyof Ingredients] = Number(val);
    //         }
    //     }        

    //     ingredientsUpdate(ingredientsNew);
    // }, [location]);
    return(
        <div>
            {
                Object.values(ingredients).reduce((a, b)=>a+b,0)===0
                    ? <Redirect to="/" />
                    : null

            }
            <CheckoutSummary 
                ingredients={ingredients} 
                checkoutCancelled={()=>history.goBack() }
                checkoutContinued={()=>{history.replace('/checkout/contact-data'+location.search)}} 
            />
            <Route path={props.match.path+'/contact-data'}  component={ContactData} />
        </div>
        
    );
};
const stateToProps=(state:State)=>{
    return{
        ingredients: state.ingredients,
        price:state.price
    }
};
const dispatchToProps=(dispatch:any)=>{
    return{
        setIngredients:(ingredients:Ingredients)=>dispatch({type:ActionTypes.SET_INGREDIENTS, ingredients:ingredients})
    };
}

export default connect(stateToProps, dispatchToProps)(withRouter(Checkout));