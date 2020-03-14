import React from 'react';
import Navbar from './Navbar/Navbar';
import { Banner } from './Banner/Banner';
import Menu from './Menu/Menu';
import { GlobalStyle } from './Styles/GlobalStyle';
import Order from './Order/Order';
import FoodDialog from './FoodDialog/FoodDialog';
import useOpenFood from './Hooks/useOpenFood';
import useOrders from './Hooks/useOrders';

function App() {
  const openFood = useOpenFood();
  const orders = useOrders();

  return (
    <>
      <GlobalStyle />
      <FoodDialog {...openFood} {...orders} />
      <Navbar />
      <Order {...orders} />
      <Banner />
      <Menu {...openFood} />
      <img
        src="https://www.metaweather.com/static/img/weather/png/64/c.png"
        alt="forecast-img"
      />
    </>
  );
}

export default App;
