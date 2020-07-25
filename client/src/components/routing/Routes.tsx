import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TickersListing from '../tickersListing/TickersListing';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/tickers' component={TickersListing} />
      </Switch>
    </section>
  );
};

Routes.propTypes = {};

export default Routes;
