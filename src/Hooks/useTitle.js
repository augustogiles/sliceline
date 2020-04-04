import { useEffect } from 'react';

function useTitle({ openFood, orders }) {
  const amount = Object.values(orders).reduce(
    (acc, { quantity }) => quantity + acc,
    0
  );

  useEffect(() => {
    if (openFood) {
      document.title = openFood.name;
    } else {
      document.title =
        amount === 0
          ? `What's for dinner?`
          : `[${amount}] items in your order!`;
    }
  });
}
export default useTitle;
