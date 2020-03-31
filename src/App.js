import React from 'react';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import Banner from './Banner/Banner';
import Navbar from './Navbar/Navbar';
import GlobalStyle from './Styles/GlobalStyle';
import Order from './Order/Order';
import FoodDialog from './FoodDialog/FoodDialog';
import OrderDialog from './Order/OrderDialog';
import useOpenFood from './Hooks/useOpenFood';
import useOpenCart from './Hooks/useOpenCart';
import useOrders from './Hooks/useOrders';
import useTitle from './Hooks/useTitle';
import useAuth from './Hooks/useAuth';
import useOrderDialog from './Hooks/useOrderDialog';
import Routes from './routes';

const Container = styled.div`
  margin-right: ${props => (props.openCart ? '340px' : '0')};
  transition: margin-right 0.5s ease-in-out;
`;

function App() {
  const auth = useAuth();
  const openCart = useOpenCart();
  const orders = useOrders();
  const orderDialog = useOrderDialog();
  const openFood = useOpenFood();

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
          <Routes
            orders={orders}
            orderDialog={orderDialog}
            openFood={openFood}
          />
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
