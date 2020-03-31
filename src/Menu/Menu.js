import React from 'react';
import { ContentWrapper } from '../Styles/commons';
import { formatPrice } from '../Data/FoodData';
import { Food, FoodGrid, FoodLabel } from './FoodGrid';

const Menu = ({ foodList, setOpenFood }) => {
  const openFood = food => () => setOpenFood(food);

  const sectionGrid = (sectionName, section) => (
    <React.Fragment key={`frag${sectionName}`}>
      <h1 key={`section_${sectionName}`}>{sectionName}</h1>
      <FoodGrid key={sectionName}>
        {section.map(food => (
          <Food key={food.name} img={food.img} onClick={openFood(food)}>
            <FoodLabel key={`label_${food.name}`}>
              <div>{food.name}</div>
              <div>{formatPrice(food.price)}</div>
            </FoodLabel>
          </Food>
        ))}
      </FoodGrid>
    </React.Fragment>
  );

  return (
    <ContentWrapper>
      {Object.entries(foodList).map(([sectionName, section]) =>
        sectionGrid(sectionName, section)
      )}
    </ContentWrapper>
  );
};

export default React.memo(Menu);
