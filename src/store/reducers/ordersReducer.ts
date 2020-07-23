import ActionTypes from "../actions/actionTypes";
import updateObject from "../utility";
import { Order } from "../types/Orders";



const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error:null
};
export interface State {
    orders: Order[],
    error:Error|null
    loading: boolean,
    purchased: boolean,
}
export interface Action {
    type: ActionTypes,
    orders?: Order[],
    error?:Error,
}

const fetchOrdersStart = (state:State, action:Action)=>{
    return updateObject(state,{
        loading: true,
        error: null
    });
};
const fetchOrdersSuccess = (state:State, action:Action)=>{
    return updateObject(state, {
        orders: action.orders,
        loading: false,
    });
}
const fetchOrdersFail = (state:State, action:Action)=>{
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}
const purchaseInit = (state:State, action:Action)=>{
    return updateObject(state,{
        purchased: false,
        loading: false,
        error: null
    });
};
const purchaseStart = (state:State, action:Action)=>{
    return updateObject(state,{
        loading: true,
        purchased: false,
        error: null
    });
};
const purchaseSuccess = (state:State, action:Action)=>{
    return updateObject(state, {
        purchased: true,
        loading: false,
    });
}
const purchaseFail = (state:State, action:Action)=>{
    return updateObject(state, {
        loading: false,
        purchased: false,
        error: action.error
    });
}
const ordersReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action); 
        case ActionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action); 
        case ActionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action); 
        case ActionTypes.PURCHASE_START: return purchaseStart(state, action); 
        case ActionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state, action); 
        case ActionTypes.PURCHASE_FAIL: return purchaseFail(state, action); 
        case ActionTypes.PURCHASE_INIT: return purchaseInit(state, action); 
        
    }
    return state;
};

export default ordersReducer;