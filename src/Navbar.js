import React from 'react';
import { NavLink } from 'react-router-dom';

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
          <NavLink to="/contact" activeClassName="active">Card Matching</NavLink>
        </li>
         <li>
          <NavLink to="/Game1" activeClassName="active">Tic-Tac-Toe</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
