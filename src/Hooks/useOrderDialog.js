import { useState } from 'react';

function useOrderDialog() {
  const [openOrderDialog, setOpenOrderDialog] = useState();

  return {
    openOrderDialog,
    setOpenOrderDialog
  };
}

export default useOrderDialog;
