import React, { Fragment, useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import AxiosOrders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
//import classes from'./Orders.module.css';

interface Props {

}
interface Order{
    ingredients:Ingredients;
    price:number;
    id?:string;

}
const Orders = (props: Props) => {

    const [loading, loadingUpdate] = useState(true);
    const [orders, ordersUpdate] = useState([] as Order[]);
    useEffect(() => {
        AxiosOrders.get('/oders.json')
            .then(res=>{
                console.log(res);
                const fetchedOrders = Object.entries(res.data).map(([key, val])=>{
                    return {id: key, ...(val as Object)};
                });
                ordersUpdate(fetchedOrders as Order[]);
                loadingUpdate(false);
            })
            .catch(err=>{
                loadingUpdate(false);
            })
    }, []);
    return (
        <div>
            {
                orders.map( (order)=>(
                    <Order 
                        key={order.id}
                        price={order.price}
                        ingredients={order.ingredients}/>
                ))
            }
        </div>
    );
};

export default withErrorHandler(Orders, AxiosOrders);