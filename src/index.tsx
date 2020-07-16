import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/reducers/reducer1';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import ActionTypes from './store/actions/actionTypes';

const actionTypeEnumToString = (action: any): any => typeof action.type === 'number' && ActionTypes[action.type] ? ({
  type: ActionTypes[action.type],
  payload: action.payload,
}) : action;
const composeEnhancers = composeWithDevTools({ actionSanitizer: actionTypeEnumToString });

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

