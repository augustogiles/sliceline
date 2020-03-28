import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Banner from './Banner/Banner';
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
      <BrowserRouter>
        <GlobalStyle />
        <div style={{ paddingRight: '340px' }}>
          <Banner />
          <Navbar {...auth} />
          <Order {...orders} {...openFood} {...auth} {...orderDialog} />
          <Routes
            orders={orders}
            orderDialog={orderDialog}
            openFood={openFood}
          />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
