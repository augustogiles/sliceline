import React from 'react';
import styled from 'styled-components';
import Title from '../../Styles/title';
import { pizzaRed } from '../../Styles/colors';

const QuantityInputStyled = styled.input`
  font-size: 18px;
  width: 24px;
  text-align: center;
  outline: none;
  border: none;
`;

const IncrementContainer = styled(Title)`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  height: 56px;
`;

const IncrementStyled = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
`;

const IncrementButton = styled.div`
  width: 23px;
  color: ${pizzaRed};
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  line-height: 23px;
  margin: 0px 10px;
  border: 1px solid ${pizzaRed};

  ${({ disabled }) =>
    disabled &&
    `opacity: 0.5;
     pointer-events: none;
    `}
  &:hover {
    background-color: #ffe3e3;
  }
`;

function onIncrementHandle(quantity, increment) {
  return quantity.setValue(quantity.value + increment);
}

export default function QuantityInput({ quantity }) {
  return (
    <IncrementContainer>
      <div>Quantity:</div>
      <IncrementStyled>
        <IncrementButton
          onClick={() => onIncrementHandle(quantity, -1)}
          disabled={quantity.value === 1}
        >
          -
        </IncrementButton>
        <QuantityInputStyled {...quantity} />
        <IncrementButton onClick={() => onIncrementHandle(quantity, 1)}>
          +
        </IncrementButton>
      </IncrementStyled>
    </IncrementContainer>
  );
}
