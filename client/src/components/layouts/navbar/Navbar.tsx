import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import Search from './search/Search';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const guestLinks = (
    <div className={toggle === false ? 'defaultMobile' : 'dropdown'}>
      <ul>
        <li>
          <Search />
        </li>
        <li>
          <Link to='/tickers'>Top Tickers</Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className='navbar bg-dark'>
      <div className='row'>
        <div className='col-10 col-md-12'>
          <h1>
            <Link to='/' className='brandName'>
              StockVisualizer
            </Link>
          </h1>
        </div>
        <div className='col-2  burgerIcon'>
          <i
            onClick={() => setToggle(!toggle)}
            className={toggle ? 'fa fa-times' : 'fas fa-bars'}
          ></i>
        </div>
      </div>
      {<Fragment>{guestLinks}</Fragment>}
    </nav>
  );
};

export default Navbar;
