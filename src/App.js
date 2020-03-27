import React, { useEffect, useState } from 'react';
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
import { database } from './firebase';

async function getHistory() {
  let list = null;
  const ordersListRef = database.ref('orders');
  await ordersListRef.once(await 'value', snap => {
    const objects = snap.val();
    list = Object.keys(snap.val()).map(id => {
      const data = objects[id];
      const orderPayload = {
        id,
        ...data
      };

      return orderPayload;
    });
  });

  return list;
}

function App() {
  const [history, setHistory] = useState(null);

  const openFood = useOpenFood();
  const orders = useOrders();
  const auth = useAuth();
  const orderDialog = useOrderDialog();

  useEffect(() => {
    if (auth.loggedIn) {
      getHistory().then(ordersHist => {
        setHistory(ordersHist);
      });
    }
  }, []);

  useTitle({ ...openFood, ...orders });
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Banner />
        <Navbar {...auth} />
        <Order {...orders} {...openFood} {...auth} {...orderDialog} />
        <Routes
          orders={orders}
          orderDialog={orderDialog}
          openFood={openFood}
          history={history}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
