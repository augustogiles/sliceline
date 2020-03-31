import { useState } from 'react';

function useOpenFood() {
  const [openFood, setOpenFood] = useState(false);

  return {
    openFood,
    setOpenFood
  };
}

export default useOpenFood;
