import { useState } from 'react';

const toppingList = [
  'Extra Cheese',
  'Pepperoni',
  'Sausage',
  'Onions',
  'Peppers',
  'Pineapple',
  'Ham',
  'Spinach',
  'Artichokes',
  'Mushrooms',
  'Anchovies'
];

const getDefaultToppings = () => {
  return toppingList.map(topping => ({
    name: topping,
    checked: false
  }));
};

export default function useToppings(defaultTopping) {
  const [toppings, setToppings] = useState(
    defaultTopping || getDefaultToppings()
  );

  function checkTopping(index) {
    const newToppings = [...toppings];
    newToppings[index].checked = !newToppings[index].checked;
    setToppings(newToppings);
  }

  return { checkTopping, toppings };
}
