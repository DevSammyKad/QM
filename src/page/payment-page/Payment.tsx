'use client';
import CrossSvg from '@/src/icons/crossSvg';
import DialogWrapper from '@/src/ui/dialog-wrapper.tsx/dialog-wrapper';
import React, { useState } from 'react';
import OrderConfirmPopUp from './OrderConfirmPopUp';

const [openOrderConfirmPopUp, setOpenOrderConfirmPopUp] =
  useState<boolean>(false);
const openOrderConfirmPopUpHandler = () => {
  setOpenOrderConfirmPopUp(true);
};
const closeOrderConfirmPopUpHandler = () => {
  setOpenOrderConfirmPopUp(false);
};

const Payment = () => {
  return (
    <div>
      {/* <button onClick={openOrderConfirmPopUpHandler}>Open PopUp</button> */}
      <DialogWrapper
        open={openOrderConfirmPopUp}
        onClose={closeOrderConfirmPopUpHandler}
        closeBtnIcon={<CrossSvg />}
        className="w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
      >
        <OrderConfirmPopUp />
      </DialogWrapper>
    </div>
  );
};

export default Payment;
