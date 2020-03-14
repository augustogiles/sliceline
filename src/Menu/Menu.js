import React from 'react';
import styled from 'styled-components';
import { foods, formatPrice } from '../Data/FoodData';

import { Food, FoodGrid, FoodLabel } from './FoodGrid';

const MenuStyled = styled.div`
  /* border: 2px solid black; */
  height: 1000px;
  margin: 0px 400px 50px 20px;
`;

function Menu({ setOpenFood }) {
  return (
    <MenuStyled>
      {Object.entries(foods).map(([sectionName, section]) => (
        <>
          <h1 key={`section_${sectionName}`}>{sectionName}</h1>
          <FoodGrid key={sectionName}>
            {section.map(food => (
              <Food
                key={food.name}
                img={food.img}
                onClick={() => {
                  setOpenFood(food);
                }}
              >
                <FoodLabel key={food.name}>
                  <div>{food.name}</div>
                  <div>{formatPrice(food.price)}</div>
                </FoodLabel>
              </Food>
            ))}
          </FoodGrid>
        </>
      ))}
    </MenuStyled>
  );
}

export default Menu;
