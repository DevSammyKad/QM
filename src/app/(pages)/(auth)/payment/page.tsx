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
import { loadHyper } from '@juspay-tech/hyper-js';

import React, { useEffect, useState } from 'react';

import {
  HyperElements,
  useHyper,
  useWidgets,
} from '@juspay-tech/react-hyper-js';
import CheckoutForm from '@/src/page/payment-page/checkout-form';

const page = () => {
  const [options, setOptions] = useState(null);
  const [clientSecret, setClientSecret] = useState();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [openOrderConfirmPopUp, setOpenOrderConfirmPopUp] =
    useState<boolean>(false);
  const openOrderConfirmPopUpHandler = () => {
    setOpenOrderConfirmPopUp(true);
  };
  const closeOrderConfirmPopUpHandler = () => {
    setOpenOrderConfirmPopUp(false);
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }], country: 'US' }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const hyperPromise = loadHyper('YOUR_PUBLISHABLE_KEY', {
    customBackendUrl: 'https://quickmeds.sndktech.online',
    //You can configure this as an endpoint for all the api calls such as session, payments, confirm call.
  });

  // const handleSubmit = async (e) => {
  //   setMessage('');
  //   //e.preventDefault();

  //   if (!hyper || !widgets) {
  //     return;
  //   }
  //   setIsLoading(true);

  //   const { error, status } = await hyper.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       // Make sure to change this to your payment completion page
  //       return_url: 'https://example.com/complete',
  //     },
  //     redirect: 'always', // if you wish to redirect always, otherwise it is defaulted to "if_required"
  //   });

  //   if (error) {
  //     if (error.type === 'card_error' || error.type === 'validation_error') {
  //       setMessage(error.message);
  //     } else {
  //       if (error.message) {
  //         setMessage(error.message);
  //       } else {
  //         setMessage('An unexpected error occurred.');
  //       }
  //     }
  //   }
  //   if (status) {
  //     handlePaymentStatus(status); //handle payment status
  //   }
  //   setIsLoading(false);
  // };

  const hyper = useHyper();
  const widgets = useWidgets();

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

          <div className="App">
            {/* <HyperElements options={options} hyper={hyperPromise}>
              <h1>Hey Opened</h1>
            </HyperElements> */}

            <CheckoutForm />

            {/* <PaymentElement
              id="payment-element"
              options={options}
              onPaymentButtonClick={() => {
                console.log('This is a SYNC CLICK');
                // Add any custom logic for when the payment button is clicked, such as logging or tracking
              }}
              onPaymentComplete={() => {
                console.log('OnPaymentComplete');
                // Add any custom post-payment logic here, such as redirection or displaying a success message
              }}
            /> */}
          </div>
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
