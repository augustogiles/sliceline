import React from 'react';
import { Banner } from '../../Banner/Banner';
import Menu from '../../Menu/Menu';
import FoodDialog from '../../FoodDialog/FoodDialog';
import OrderDialog from '../../Order/OrderDialog';

export default function Main({ orderDialog, orders, openFood }) {
  return (
    <>
      <OrderDialog {...orderDialog} {...orders} />
      <FoodDialog {...openFood} {...orders} />
      <Banner />
      <Menu {...openFood} />
    </>
  );
}
