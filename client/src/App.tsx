import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

// components
import Landing from './components/layouts/landing/Landing';
import Navbar from './components/layouts/navbar/Navbar';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// CSS
import './App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Landing} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
