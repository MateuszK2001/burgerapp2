import AxiosOrders from "../../axios-orders";
import { Action } from "../reducers/ordersReducer";
import ActionTypes from "./actionTypes";

export var ordersActions = {
    fetchOrders: (token:string, userId:string)=>{
        return (dispatch:any)=>{
            dispatch({type: ActionTypes.FETCH_ORDERS_START} as Action);
            const queryParams = `?auth=${token}`;
            return AxiosOrders.get(`/orders/${userId}.json${queryParams}`)
                .then(res=>{
                    const fetchedOrders = Object.entries(res.data).map(([key, val])=>{
                        return {id: key, ...(val as Object)};
                    });
                    dispatch({
                        type: ActionTypes.FETCH_ORDERS_SUCCESS,
                        orders: fetchedOrders
                    } as Action);
                })
                .catch(err=>{
                    dispatch(
                        {type: ActionTypes.FETCH_ORDERS_FAIL,
                        error:err
                    } as Action);
                })
        };
    },
    purchase: (token:string, userId:string, order:any)=>{
        return (dispatch:any)=>{
            dispatch({type: ActionTypes.PURCHASE_START} as Action);
            
            const queryParams = `?auth=${token}`;
            return AxiosOrders.post(`/orders/${userId}.json`+queryParams, order)
                .then(res=>{
                    dispatch({
                        type: ActionTypes.PURCHASE_SUCCESS,
                    } as Action);
                })
                .catch(err=>{
                    dispatch(
                        {type: ActionTypes.PURCHASE_FAIL,
                        error:err
                    } as Action);
                })
        };
    },   
    purchaseInit: ()=>{
         return {type: ActionTypes.PURCHASE_INIT};
    }
}