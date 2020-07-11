import React, {useState, useEffect} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import { useHistory, useLocation, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
//import classes from'./Checkout.module.css';

interface Props{
}
const Checkout = (props:Props&RouteComponentProps)=>{
    const history = useHistory();
    const location = useLocation();
    const [ingredients, ingredientsUpdate] = useState({
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    } as Ingredients);
    const [price, priceUpdate] = useState(0);
    
    useEffect(()=>{
        const query = new URLSearchParams(location.search);
        const ingredientsNew = {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        };
        for(const [key, val] of query.entries()){
            if(key === 'price'){
                priceUpdate(Number(val));
            }
            else{
                ingredientsNew[key as keyof Ingredients] = Number(val);
            }
        }        

        ingredientsUpdate(ingredientsNew);
    }, [location]);
    return(
        <div>
            <CheckoutSummary 
                ingredients={ingredients} 
                checkoutCancelled={()=>history.goBack() }
                checkoutContinued={()=>{history.replace('/checkout/contact-data'+location.search)}} 
            />
            <Route path={props.match.path+'/contact-data'}  render={()=><ContactData ingredients={ingredients} price={price}/>} />
        </div>
        
    );
};

export default withRouter(Checkout);