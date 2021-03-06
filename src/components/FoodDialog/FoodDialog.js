import React from 'react';
import styled from 'styled-components';

import { FiX } from 'react-icons/fi';
import { pizzaRed } from 'Styles/colors';
import { formatPrice } from 'Data/FoodData';

import Title from 'Styles/title';
import { Button } from 'Styles/commons';

import useQuantity from 'Hooks/useQuantity';
import useToppings from 'Hooks/useToppings';
import useChoice from 'Hooks/useChoice';
import QuantityInput from './QuantityInput';
import { FoodLabel } from '../Menu/FoodGrid';
import Toppings from './Toppings';
import Choices from './Choices';

export const Dialog = styled.div`
  width: 500px;
  background-color: white;
  position: fixed;
  top: 75px;
  z-index: 11;
  max-height: calc(100% - 100px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const DialogButton = styled(Button)`
  background-color: transparent;
  position: absolute;
  right: 0;

  svg {
    color: #fff;
    &:hover {
      color: #707070;
    }
  }
`;

export const DialogContent = styled.div`
  overflow: auto;
  min-height: 100px;
  padding: 0 40px;
  padding-bottom: 80px;
`;

export const DialogFooter = styled.div`
  box-shadow: 0px -2px 20px 0px grey;
  height: 60px;
  display: flex;
  justify-content: center;
`;

export const DefaultButton = styled.div`
  cursor: pointer;
`;

export const ConfirmButton = styled(Title)`
  margin: 10px;
  color: white;
  height: 20px;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: ${pizzaRed};

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    background-color: grey;
    pointer-events: none;
  `}
`;

export const DialogShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: black;
  opacity: 0.7;
  z-index: 11;
`;

const DialogBanner = styled.div`
  min-height: 200px;
  margin-bottom: 20px;
  ${({ img }) => (img ? `background-image: url(${img});` : `min-height: 75px;`)}
  background-position: center;
  background-size: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const DialogBannerName = styled(FoodLabel)`
  /* top: 100px; */
  top: ${({ img }) => (img ? `100px` : `20px`)};
  font-size: 30px;
  padding: 5px 40px;
`;

const pricePerTopping = 0.5;

export function getPrice(order) {
  return (
    order.quantity *
    (order.price +
      order.toppings.filter(topping => topping.checked).length *
        pricePerTopping)
  );
}

export function hasToppings(food) {
  return food.section === 'Pizza';
}

function FoodDialogContainer({ openFood, setOpenFood, setOrders, orders }) {
  const quantity = useQuantity(openFood && openFood.quantity);
  const toppings = useToppings(openFood.toppings);
  const choiceRadio = useChoice(openFood.choices);
  const isEditing = openFood.index > -1;

  function close() {
    setOpenFood();
  }
  if (!openFood) return null;
  const order = {
    ...openFood,
    quantity: quantity.value,
    toppings: toppings.toppings,
    choice: choiceRadio.choice
  };

  function editOrder() {
    const newOrders = { ...orders };
    newOrders[openFood.id] = order;
    setOrders(newOrders);
    close();
  }

  function addToOrder() {
    const newOrders = { ...orders };
    if (newOrders[order.id]) {
      newOrders[order.id].quantity += 1;
    } else {
      newOrders[order.id] = order;
    }
    setOrders(newOrders);
    close();
  }

  return openFood ? (
    <>
      <DialogShadow onClick={close} />
      <Dialog>
        <DialogButton onClick={close}>
          <FiX size={40} />
        </DialogButton>
        <DialogBanner img={openFood.img}>
          <DialogBannerName>{openFood.name}</DialogBannerName>
        </DialogBanner>
        <DialogContent>
          <QuantityInput quantity={quantity} />
          {hasToppings(openFood) && (
            <>
              <h3> Would you like toppings? </h3>
              <Toppings {...toppings} />
            </>
          )}
          {openFood.choices && (
            <Choices openFood={openFood} choiceRadio={choiceRadio} />
          )}
        </DialogContent>
        <DialogFooter>
          <ConfirmButton
            onClick={isEditing ? editOrder : addToOrder}
            disabled={openFood.choices && !choiceRadio.value}
          >
            {isEditing ? `Update order ` : `Add to order: `}
            {formatPrice(getPrice(order))}
          </ConfirmButton>
        </DialogFooter>
      </Dialog>
    </>
  ) : null;
}

export default function FoodDialog(props) {
  // eslint-disable-next-line react/destructuring-assignment
  if (!props.openFood) return null;
  return <FoodDialogContainer {...props} />;
}
