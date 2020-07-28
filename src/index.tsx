import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import burgerReducer, { State as BurgerState } from './store/reducers/burgerReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import ActionTypes from './store/actions/actionTypes';
import authReducer, { State as AuthState } from './store/reducers/authReducer';
import ordersReducer, { State as OrdersState } from './store/reducers/ordersReducer';
import { BrowserRouter } from 'react-router-dom';

const actionTypeEnumToString = (action: any): any => typeof action.type === 'number' && ActionTypes[action.type] ? ({
  type: ActionTypes[action.type],
  payload: action.payload,
}) : action;
const composeEnhancers = composeWithDevTools({ actionSanitizer: actionTypeEnumToString });

export interface MergedState {
  auth: AuthState,
  burger: BurgerState,
  orders: OrdersState
}
const store = createStore(combineReducers({
  auth: authReducer,
  burger: burgerReducer,
  orders: ordersReducer
})
  , composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

