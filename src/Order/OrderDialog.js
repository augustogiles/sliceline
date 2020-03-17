import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  ConfirmButton,
  DialogShadow
} from '../FoodDialog/FoodDialog';

export default function OrderDialog({
  openOrderDialog,
  setOpenOrderDialog,
  setOrders
}) {
  const handleOpenOrderDialog = () => {
    setOrders([]);
    setOpenOrderDialog();
  };

  return openOrderDialog ? (
    <>
      <DialogShadow />
      <Dialog>
        <DialogContent>
          <h2>
            <span role="img" aria-label="delivery truck">
              🚚
            </span>
            Your order is on the way!
          </h2>
          <p>
            You have been emailed confirmation of your order. Thanks for
            choosing Sliceline.
          </p>
        </DialogContent>
        <DialogFooter>
          <ConfirmButton onClick={handleOpenOrderDialog}>
            I&apos;m still Hungry!!!
          </ConfirmButton>
        </DialogFooter>
      </Dialog>
    </>
  ) : (
    <div />
  );
}
