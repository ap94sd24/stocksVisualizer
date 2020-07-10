import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
          StockVisualizer
        </Link>
      </h1>
    </nav>
  )
}

export default Navbar
