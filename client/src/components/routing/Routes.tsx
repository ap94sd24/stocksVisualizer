import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TickersListing from '../tickersListing/TickersListing';
import Stock from '../stock/Stock';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/tickers' component={TickersListing} />
        <Route exact path='/stock/:type/:symbol' component={Stock} />
      </Switch>
    </section>
  );
};

Routes.propTypes = {};

export default Routes;
