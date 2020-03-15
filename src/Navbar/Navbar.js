import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { pizzaRed } from '../Styles/colors';
import Title from '../Styles/title';

const NavbarStyled = styled.div`
  background-color: ${pizzaRed};
  padding: 10px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled(Title)`
  font-size: 20px;
  color: white;
  text-shadow: 1px 1px 4px #380502;
`;

const RouterList = styled.ul`
  font-weight: bold;

  list-style: none;
  display: inherit;
  margin: 0;
  padding: 0;

  li {
    cursor: pointer;
    margin: 0 20px;
    border-color: transparent;
    transition: border-bottom 0.2s ease-in-out;
    &:hover {
      border-bottom: 2px solid white;
    }
  }

  li a {
    color: white;
    text-decoration: none;
  }
`;

const UserStatus = styled.div`
  color: white;
  font-size: 12px;
  font-weight: bold;
  margin-right: 30px;

  display: flex;
  align-items: center;
`;

const LoginButton = styled.span`
  cursor: pointer;
`;

function Navbar({ login, loggedIn, logout }) {
  return (
    <NavbarStyled>
      <Logo>
        Sliceline
        <span role="img" aria-label="pizza slice">
          🍕
        </span>
      </Logo>
      <RouterList>
        <li>
          <Link to="/">Menu</Link>
        </li>
        <li>
          <Link to="/history">My past orders</Link>
        </li>
      </RouterList>
      <UserStatus>
        {loggedIn ? (
          <LoginButton onClick={logout}> Log out </LoginButton>
        ) : (
          <LoginButton onClick={login}> Log in / Sign up </LoginButton>
        )}
      </UserStatus>
    </NavbarStyled>
  );
}

export default Navbar;
