import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import Search from './search/Search';

const Navbar = () => {
  const guestLinks = (
    <ul>
      <li>
        <Search/>
      </li>
      <li>
        <Link to='/tickers' >Top Tickers</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>StocksVisualizer</Link>
      </h1>
      {<Fragment>{guestLinks}</Fragment>}
    </nav>
  );
};

export default Navbar;
