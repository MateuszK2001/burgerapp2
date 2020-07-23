import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import AxiosOrders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { MergedState } from '../..';
import { ordersActions } from '../../store/actions/ordersActions';
import { Order as OrderType } from '../../store/types/Orders';
//import classes from'./Orders.module.css';

interface Props {
    orders: OrderType[],
    loading: boolean,
    error: Error,
    fetchOrders: (token:string)=>Promise<void>,
    token: string|null
}

const Orders = (props: Props) => {
    const {token, fetchOrders} = props;

    useEffect(() => {
        if(token)
            fetchOrders(token);        
    }, [token, fetchOrders]);
    const ordersJsx = props.loading
        ? <Spinner />
        : props.orders.map( (order)=>(
            <Order 
                key={order.id}
                price={order.price}
                ingredients={order.ingredients}/>
        ));
    
    return (
        <div>
            {props.token !== null ? ordersJsx: "Nie jesteś zalogowany"}
        </div>
    );
};
const stateToProps = (state:MergedState)=>{
    return{
        orders: state.orders.orders,
        loading: state.orders.loading,
        error: state.orders.error,
        token: state.auth.token
    };
};
const dispatchToProps = (dispatch:any)=>{
    return{
        fetchOrders: (token:string)=> dispatch(ordersActions.fetchOrders(token))
    }
};
export default connect(stateToProps, dispatchToProps)(withErrorHandler(Orders, AxiosOrders));