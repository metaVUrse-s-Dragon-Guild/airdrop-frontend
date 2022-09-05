import React from 'react';
import { Switch } from 'react-router-dom';
import { Dashboard, Transaction, Terms, BuyToken, Faq, Claim } from '../views';
import { Route } from 'react-router';

const Routes = () => {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route path='/' exact component={Dashboard}></Route>
      <Route path='/faq' component={Faq}></Route>
      <Route path='/transaction' component={Transaction}></Route>
      <Route path='/buy' component={BuyToken}></Route>
      <Route path='/terms' component={Terms}></Route>
      <Route path='/claim' component={Claim}></Route>
    </Switch>
    // </Suspense>
  );
};

export default Routes;
