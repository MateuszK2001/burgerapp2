import React, { useEffect, Suspense } from 'react';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { authActions } from './store/actions/authActions';
import { MergedState } from '.';
import Spinner from './components/UI/Spinner/Spinner';
const CheckoutAsync = React.lazy(() => import('./containers/Checkout/Checkout'));
const OrdersAsync = React.lazy(() => import('./containers/Orders/Orders'));

interface Props {
  tryAutoSignin: () => void;
  isAuthenticated: boolean;
}

function App(props: Props) {
  const tryAutoSignin = props.tryAutoSignin;
  useEffect(() => {
    tryAutoSignin();
  }, [tryAutoSignin]);

  let routes: JSX.Element = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route exact path='/' component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path='/' component={BurgerBuilder} />
        <Route path='/checkout' component={CheckoutAsync} />
        <Route path='/orders' component={OrdersAsync} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={Auth} /> {/*has to be here to properly redirect*/}
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        {routes}
      </Suspense>
    </Layout>
  );
}

const stateToProps = (state: MergedState) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}
const dispatchToProps = (dispatch: any) => {
  return {
    tryAutoSignin: () => dispatch(authActions.authCheckSate())

  };
}
export default withRouter(connect(stateToProps, dispatchToProps)(App));
