import React from 'react';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import useOrders from 'Hooks/useOrders';
import GlobalStyle from 'Styles/GlobalStyle';
import useOpenFood from 'Hooks/useOpenFood';
import useOpenCart from 'Hooks/useOpenCart';
import useTitle from 'Hooks/useTitle';
import useAuth from 'Hooks/useAuth';
import useOrderDialog from 'Hooks/useOrderDialog';
import useKeyPress from 'Hooks/useKeyPress';
import Routes from 'routes';
import OrderDialog from '../Order/OrderDialog';
import FoodDialog from '../FoodDialog/FoodDialog';
import Order from '../Order/Order';
import Navbar from '../Navbar/Navbar';
import Banner from '../Banner/Banner';

const Container = styled.div`
  margin-right: ${props => (props.openCart ? '340px' : '0')};
  transition: margin-right 0.3s ease-in-out;
`;

function App() {
  const auth = useAuth();
  const openCart = useOpenCart();
  const orders = useOrders();
  const orderDialog = useOrderDialog();
  const openFood = useOpenFood();

  function onPressUp() {
    if (!!openCart.openCart && !!openFood.openFood) {
      openFood.setOpenFood();
    } else if (openFood.openFood) {
      openFood.setOpenFood();
    } else if (openCart.openCart) {
      openCart.setOpenCart();
    }
  }

  useKeyPress('Escape', onPressUp);
  useTitle({ ...openFood, ...orders });

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Container openCart={openCart.openCart}>
          <Banner />
          <Navbar {...auth} {...openCart} />
          <Order
            {...orders}
            {...openFood}
            {...auth}
            {...orderDialog}
            {...openCart}
          />
          <OrderDialog {...orderDialog} {...orders} />
          <FoodDialog {...openFood} {...orders} />
          <Routes {...openFood} />
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
