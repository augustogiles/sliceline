import { useState } from 'react';

function useOpenFood() {
  const [openFood, setOpenFood] = useState();

  return {
    openFood,
    setOpenFood
  };
}

export default useOpenFood;
