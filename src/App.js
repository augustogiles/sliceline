import React from 'react';
import Navbar from './Navbar/Navbar';
import { Banner } from './Banner/Banner';
import Menu from './Menu/Menu';
import { GlobalStyle } from './Styles/GlobalStyle';
import Order from './Order/Order';
import FoodDialog from './FoodDialog/FoodDialog';
import useOpenFood from './Hooks/useOpenFood';
import useOrders from './Hooks/useOrders';
import useTitle from './Hooks/useTitle';
import useAuth from './Hooks/useAuth';
import OrderDialog from './Order/OrderDialog';
import useOrderDialog from './Hooks/useOrderDialog';

function App() {
  const openFood = useOpenFood();
  const orders = useOrders();
  const auth = useAuth();
  const orderDialog = useOrderDialog();
  useTitle({ ...openFood, ...orders });

  return (
    <>
      <GlobalStyle />
      <OrderDialog {...orderDialog} {...orders} />
      <FoodDialog {...openFood} {...orders} />
      <Navbar {...auth} />
      <Order {...orders} {...openFood} {...auth} {...orderDialog} />
      <Banner />
      <Menu {...openFood} />
    </>
  );
}

export default App;
