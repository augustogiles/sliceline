import React from 'react';
import styled from 'styled-components';
import {
  DialogContent,
  DialogFooter,
  ConfirmButton,
  DefaultButton,
  getPrice
} from '../FoodDialog/FoodDialog';
import { formatPrice } from '../Data/FoodData';
import { database } from '../firebase';

const OrderStyled = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  width: ${props => (props.openCart ? '340px' : '0')};
  background-color: white;
  height: 100%;
  z-index: 10;
  box-shadow: 4px 0px 5px 4px grey;
  display: flex;
  flex-direction: column;
  transition: width 0.5s ease-in-out;
`;

const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
`;

const OrderContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid grey;
  ${({ editable }) =>
    editable
      ? `
      &:hover {
        cursor: pointer;
        background-color: #e7e7e7; 
      }`
      : `
      pointer-events: none;
  `}
`;

const OrderItem = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: ${props =>
    props.header ? '340px' : '20px 150px 20px 60px'};
  text-align: ${props => (props.header ? 'left' : 'center')};
  justify-content: space-between;
`;

const DetailItem = styled.div`
  color: grey;
  font-size: 10px;
`;

export const CartFooter = styled(DialogFooter)`
  display: ${props => (props.openCart ? 'flex' : 'none')};
`;

function sendOrder(orders, { email, displayName, uid }) {
  const newOrderRef = database.ref(`orders/${uid}`).push();
  const newOrders = orders.map(order => {
    return Object.keys(order).reduce((acc, orderKey) => {
      if (!order[orderKey]) {
        return acc;
      }
      if (orderKey === 'toppings') {
        return {
          ...acc,
          [orderKey]: order[orderKey]
            .filter(({ checked }) => checked)
            .map(({ name }) => name)
        };
      }
      return {
        ...acc,
        [orderKey]: order[orderKey]
      };
    }, {});
  });
  newOrderRef.set({
    order: newOrders,
    email,
    displayName,
    uid
  });
}

export default function Order({
  orders,
  setOrders,
  setOpenFood,
  login,
  loggedIn,
  setOpenOrderDialog,
  openCart
}) {
  const subtotal = orders.reduce((total, order) => {
    return total + getPrice(order);
  }, 0);

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const deleteItem = index => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  const handleCheckout = () => {
    if (!loggedIn) {
      login();
    } else {
      setOpenOrderDialog(true);
      sendOrder(orders, loggedIn);
    }
  };

  return (
    <OrderStyled openCart={openCart}>
      {orders.length === 0 ? (
        <OrderItem header>Empty Order</OrderItem>
      ) : (
        <OrderContent>
          <OrderContainer>
            <OrderItem header> Your order: </OrderItem>
          </OrderContainer>
          {orders.map((order, index) => (
            <OrderContainer editable key={order.name}>
              <OrderItem
                onClick={() => {
                  setOpenFood({ ...order, index });
                }}
              >
                <div>{order.quantity}</div>
                <div>{order.name}</div>
                <DefaultButton
                  onClick={e => {
                    e.stopPropagation();
                    deleteItem(index);
                  }}
                >
                  <span role="img" aria-label="bin">
                    🗑️
                  </span>
                </DefaultButton>
                <div>{formatPrice(getPrice(order))}</div>
              </OrderItem>
              <DetailItem>
                {order.toppings
                  .filter(topping => topping.checked)
                  .map(topping => topping.name)
                  .join(', ')}
              </DetailItem>
              {order.choice && <DetailItem>{order.choice}</DetailItem>}
            </OrderContainer>
          ))}
          <OrderContainer>
            <OrderItem>
              <div />
              <div>Sub-Total</div>
              <div>{formatPrice(subtotal)}</div>
              <div />
            </OrderItem>
            <OrderItem>
              <div />
              <div>Tax</div>
              <div>{formatPrice(tax)}</div>
              <div />
            </OrderItem>
            <OrderItem>
              <div />
              <div>Total</div>
              <div>{formatPrice(total)}</div>
              <div />
            </OrderItem>
          </OrderContainer>
        </OrderContent>
      )}
      {!!orders.length && (
        <CartFooter openCart={openCart}>
          <ConfirmButton onClick={handleCheckout}>Checkout</ConfirmButton>
        </CartFooter>
      )}
    </OrderStyled>
  );
}
