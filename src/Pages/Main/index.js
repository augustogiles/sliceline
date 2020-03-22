import React from 'react';
import Menu from '../../Menu/Menu';
import FoodDialog from '../../FoodDialog/FoodDialog';
import OrderDialog from '../../Order/OrderDialog';

export default function Main({ orderDialog, orders, openFood }) {
  return (
    <>
      <OrderDialog {...orderDialog} {...orders} />
      <FoodDialog {...openFood} {...orders} />
      <Menu {...openFood} />
    </>
  );
}
