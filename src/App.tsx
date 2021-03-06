import React from 'react';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route exact path='/' component={BurgerBuilder} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
