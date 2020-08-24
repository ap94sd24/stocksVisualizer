import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import Search from './search/Search';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const guestLinks = (
    <div className={toggle ? 'defaultMobile' : 'dropdown'}>
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
      <h1>
        <div className='row'>
          <div className='col-8 col-md-12'>
            <Link to='/' className='brandName'>
              StockVisualizer
            </Link>
          </div>
          <div className='col-4  burgerIcon'>
            <i onClick={() => setToggle(!toggle)} className={!toggle ? 'fa fa-times' : 'fas fa-bars'}></i>
          </div>
        </div>
      </h1>
      {<Fragment>{guestLinks}</Fragment>}
    </nav>
  );
};

export default Navbar;
