import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import { Banner } from './Banner/Banner';
import { Menu } from './Menu/Menu';
import { GlobalStyle } from './Styles/GlobalStyle';
import Order from './Order/Order';
import FoodDialog from './FoodDialog/FoodDialog';

function App() {
  const [openFood, setOpenFood] = useState();

  return (
    <>
      <GlobalStyle />
      <FoodDialog openFood={openFood} setOpenFood={setOpenFood} />
      <Navbar />
      <Order />
      <Banner />
      <Menu setOpenFood={setOpenFood} />
      <img
        src="https://www.metaweather.com/static/img/weather/png/64/c.png"
        alt="forecast-img"
      />
    </>
  );
}

export default App;
