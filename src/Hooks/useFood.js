import { useState, useEffect, useCallback } from 'react';

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
  }, []);

  return { foodList };
}

export default useFood;
