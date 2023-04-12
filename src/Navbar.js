import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/minigames" activeClassName="active">Minigames</NavLink>
        </li>
        <li>
          <NavLink to="/Game2" activeClassName="active">Card Matching</NavLink>
        </li>
         <li>
          <NavLink to="/Game1" activeClassName="active">Tic-Tac-Toe</NavLink>
        </li>
        <li>
          <NavLink to="/Game3" activeClassName="active">Whac-A-Mole</NavLink>
        </li>
        <li> 
        <NavLink to="/Game4" activeClassName="active">Snake</NavLink>
        </li>
        <li> 
        <NavLink to="/Game5" activeClassName="active">Button Game</NavLink>
        </li>
        <li> 
        <NavLink to="/Game6" activeClassName="active">Unity Game</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
