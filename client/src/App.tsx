import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

// components 
import Landing from './components/layouts/Landing';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path='/' components={Landing} />
        </Switch>
      </Fragment>
    </Router>
  );
}
export default App;
