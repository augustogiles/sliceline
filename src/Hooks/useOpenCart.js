import { useState } from 'react';

function useOpenCart() {
  const [openCart, setOpenCart] = useState(false);

  return {
    openCart,
    setOpenCart
  };
}

export default useOpenCart;
