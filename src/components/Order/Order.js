import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import { Button } from 'Styles/commons';
import { formatPrice } from 'Data/FoodData';
import { database } from 'config/firebase';
import {
  DialogContent,
  DialogFooter,
  ConfirmButton,
  DefaultButton,
  getPrice
} from '../FoodDialog/FoodDialog';

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
  transition: width 0.3s ease-in-out;
`;

const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
`;

const OrderButton = styled(Button)`
  padding: 0;
  background-color: transparent;
  color: black;
  position: relative;
  left: 260px;
  cursor: pointer;
  &:hover {
    color: #707070;
    svg {
      border-radius: 20px;
      background-color: rgba(240, 240, 245, 0.4);
    }
  }
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
  padding: 10px 20px;
  display: grid;
  grid-template-columns: ${props =>
    props.header ? '260px' : '20px 150px 20px 60px'};
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
    date: new Date().getTime(),
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
  openCart,
  setOpenCart
}) {
  const orderArray = Object.values(orders);
  const subtotal = orderArray.reduce((total, order) => {
    return total + getPrice(order);
  }, 0);

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const deleteItem = id => {
    const newOrders = { ...orders };
    delete newOrders[id];
    setOrders(newOrders);
  };

  const handleCheckout = () => {
    if (!loggedIn) {
      login();
    } else {
      setOpenOrderDialog(true);
      sendOrder(orderArray, loggedIn);
    }
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  return (
    <OrderStyled openCart={openCart}>
      <OrderContent>
        <OrderButton onClick={handleCloseCart}>
          <FiX size={40} strokeWidth={2} />
        </OrderButton>
        {orderArray.length === 0 ? (
          <>
            <OrderItem header>
              <div>Empty Order</div>
            </OrderItem>
          </>
        ) : (
          <>
            <OrderContainer>
              <OrderItem header> Your order: </OrderItem>
            </OrderContainer>
            {orderArray.map((order, index) => (
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
                      deleteItem(order.id);
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
            <>
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
            </>
          </>
        )}
      </OrderContent>
      {!!orderArray.length && (
        <CartFooter openCart={openCart}>
          <ConfirmButton onClick={handleCheckout}>Checkout</ConfirmButton>
        </CartFooter>
      )}
    </OrderStyled>
  );
}
