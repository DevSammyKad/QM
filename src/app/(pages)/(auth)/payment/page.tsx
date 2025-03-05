'use client';
import { Routes } from '@/routes.config';
import CrossSvg from '@/src/icons/crossSvg';
import Address from '@/src/page/cart/address';
import Bill from '@/src/page/cart/bill';
import Coupons from '@/src/page/cart/coupons';
import OrderConfirmPopUp from '@/src/page/payment-page/OrderConfirmPopUp';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import DialogWrapper from '@/src/ui/dialog-wrapper.tsx/dialog-wrapper';
import { Divider } from '@nextui-org/react';
import Link from 'next/link';

import React, { useState } from 'react';

const page = () => {
  const [openOrderConfirmPopUp, setOpenOrderConfirmPopUp] =
    useState<boolean>(false);
  const openOrderConfirmPopUpHandler = () => {
    setOpenOrderConfirmPopUp(true);
  };
  const closeOrderConfirmPopUpHandler = () => {
    setOpenOrderConfirmPopUp(false);
  };
  return (
    <div>
      <DialogWrapper
        open={openOrderConfirmPopUp}
        onClose={closeOrderConfirmPopUpHandler}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
      >
        <OrderConfirmPopUp />
      </DialogWrapper>
      <div className="grid  md:grid-cols-2  gap-10 ">
        <div>Payment Option Show Her dynamic</div>
        <div className="flex flex-col gap-6">
          <Coupons />
          <Divider className="h-1" />
          <Bill />
          <Divider className="h-1" />
          <Address />

          {/* <Link href={Routes.payment}> */}
          <PrimaryButton
            className="rounded-2xl"
            onClick={openOrderConfirmPopUpHandler}
          >
            Pay & Order place
          </PrimaryButton>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default page;
