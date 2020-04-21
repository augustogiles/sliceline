import React from 'react';
import styled from 'styled-components';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { pizzaRed } from '../../Styles/colors';
import Title from '../../Styles/title';

const NavbarStyled = styled.div`
  background-color: ${pizzaRed};
  padding: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled(Title)`
  display: inline;
  font-size: 20px;
  color: white;
  text-shadow: 1px 1px 4px #380502;
  margin-left: 1rem;
`;

const RouterList = styled.ul`
  display: inline;
  font-weight: bold;

  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: inline;
    cursor: pointer;
    margin: auto 20px;
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
  font-size: 12px;
  font-weight: bold;

  min-width: 160px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    margin-right: 24px;
    cursor: pointer;
  }
`;

const LoginButton = styled.button`
  display: inline-block;
  height: 32px;
  min-width: 60px;

  margin: 0 24px 0 0;
  padding: 0 20px;

  border-radius: 4px;
  border: none;
  cursor: pointer;

  text-decoration: none;
  color: ${pizzaRed};
  font-size: 12px;
  font-weight: 700;
  z-index: 10;

  &:hover {
    background-color: pink;
  }
`;

function Navbar({ login, loggedIn, logout, openCart, setOpenCart }) {
  const handleCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <NavbarStyled>
      <div style={{ display: 'inline' }}>
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
          {loggedIn && (
            <li>
              <Link to="/history">My past orders</Link>
            </li>
          )}
        </RouterList>
      </div>
      <UserStatus>
        {loggedIn ? (
          <LoginButton onClick={logout}> Log out </LoginButton>
        ) : (
          <LoginButton onClick={login}> Log in </LoginButton>
        )}
        <FiShoppingCart size={24} color="#FFF" onClick={handleCart} />
      </UserStatus>
    </NavbarStyled>
  );
}

export default Navbar;
