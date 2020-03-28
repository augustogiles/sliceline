import React, { useState, useEffect } from 'react';
import { ContentWrapper } from '../Styles/commons';
import { formatPrice } from '../Data/FoodData';
import { Food, FoodGrid, FoodLabel } from './FoodGrid';
import { database } from '../firebase';

function reduceItem(foodList) {
  return foodList.reduce((res, food) => {
    if (!res[food.section]) {
      res[food.section] = [];
    }

    res[food.section].push(food);
    return res;
  }, {});
}

async function getFood() {
  let foodList = null;
  const ordersListRef = database.ref('foods');

  await ordersListRef.once(await 'value', snap => {
    const objects = snap.val();
    foodList = Object.keys(snap.val()).map(id => {
      const data = objects[id];
      const food = {
        id,
        ...data
      };

      return food;
    });
  });

  return reduceItem(foodList);
}

function Menu({ setOpenFood }) {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    getFood()
      .then(list => {
        setFoodList(list);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <ContentWrapper>
      {Object.entries(foodList).map(([sectionName, section]) => (
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
