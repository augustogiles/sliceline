import { useState, useEffect, useCallback } from 'react';

import { database } from '../config/firebase';

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
  let foods = JSON.parse(localStorage.getItem('menu'));

  if (!foods) {
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
    foods = await reduceItem(foodList);
    localStorage.setItem('menu', JSON.stringify(foods));
  }

  return foods;
}

function useFood() {
  const [foodList, setFoodList] = useState([]);

  const fetchFood = useCallback(() => {
    getFood()
      .then(list => {
        setFoodList(list);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  return { foodList };
}

export default useFood;
