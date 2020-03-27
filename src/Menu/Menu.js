import React from 'react';
import { ContentWrapper } from '../Styles/commons';
import { foods, formatPrice } from '../Data/FoodData';
import { Food, FoodGrid, FoodLabel } from './FoodGrid';

function Menu({ setOpenFood }) {
  return (
    <ContentWrapper>
      {Object.entries(foods).map(([sectionName, section]) => (
        <React.Fragment key={`frag${sectionName}`}>
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
                <FoodLabel key={`label_${food.name}`}>
                  <div>{food.name}</div>
                  <div>{formatPrice(food.price)}</div>
                </FoodLabel>
              </Food>
            ))}
          </FoodGrid>
        </React.Fragment>
      ))}
    </ContentWrapper>
  );
}

export default Menu;
