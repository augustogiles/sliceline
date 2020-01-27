import React from 'react';
import styled from 'styled-components';
import { foods } from '../Data/FoodData'

import { Food, FoodGrid, FoodLabel } from './FoodGrid'

const MenuStyled = styled.div `
  /* border: 2px solid black; */
  height: 1000px;
  margin: 0px 400px 50px 20px;
`

export function Menu({ setOpenFood }){
  return <MenuStyled>
    {Object.entries(foods).map(([sectionName, foods], i) => (
      <>
        <h1 key={`section_${i}`}> {sectionName} </h1>
        <FoodGrid key={sectionName}>
          {foods.map((food) => (
            <Food
              key={food.name}
              img={food.img} 
              onClick={() => {
                setOpenFood(food);
              }}
            > 
              <FoodLabel key={food.name}>{food.name}</FoodLabel> 
            </Food>
          ))
          }
        </FoodGrid>
      </>
    ))}
  </MenuStyled>
}