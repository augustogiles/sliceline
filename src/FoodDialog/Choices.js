import React from 'react';
import styled from 'styled-components';

const CursorPointer = `cursor: pointer`;
const RadioInput = styled.input`
  ${CursorPointer}
`;

export default function Choices({ openFood, choiceRadio }) {
  return (
    <>
      <h3>Choose one</h3>
      {openFood.choices.map(choice => {
        return (
          <React.Fragment key={choice}>
            <RadioInput
              type="radio"
              id={choice}
              name="choice"
              value={choice}
              checked={choiceRadio.value === choice}
              onChange={choiceRadio.onChange}
            />
            <label htmlFor={choice}>{choice}</label>
          </React.Fragment>
        );
      })}
    </>
  );
}
