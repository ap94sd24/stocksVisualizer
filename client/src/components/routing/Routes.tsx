import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TickersListing from '../tickersListing/TickersListing';
import Stock from '../stock/Stock';
import SearchResults from '../searchResults/SearchResults';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/tickers' component={TickersListing} />
        <Route exact path='/stock/:symbol' component={Stock} />
        <Route exact path='/search/:results' component={SearchResults} />
      </Switch>
    </section>
  );
};

Routes.propTypes = {};

export default Routes;
