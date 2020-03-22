import React from 'react';
import Navbar from './Navbar/Navbar';
import GlobalStyle from './Styles/GlobalStyle';
import Order from './Order/Order';
import useOpenFood from './Hooks/useOpenFood';
import useOrders from './Hooks/useOrders';
import useTitle from './Hooks/useTitle';
import useAuth from './Hooks/useAuth';
import useOrderDialog from './Hooks/useOrderDialog';
import Routes from './routes';

function App() {
  const openFood = useOpenFood();
  const orders = useOrders();
  const auth = useAuth();
  const orderDialog = useOrderDialog();
  useTitle({ ...openFood, ...orders });

  return (
    <>
      <GlobalStyle />
      <Navbar {...auth} />
      <Order {...orders} {...openFood} {...auth} {...orderDialog} />
      <Routes orders={orders} orderDialog={orderDialog} openFood={openFood} />
    </>
  );
}

export default App;
