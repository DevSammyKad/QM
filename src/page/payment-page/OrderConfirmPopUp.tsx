"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Routes } from "@/routes.config"; // Import Routes configuration

const OrderConfirmPopUp = () => {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push('/'); // Navigates to home page
  };

  const handleTrackOrder = () => {
    router.push(Routes.myOrders); // Navigates to My orders page
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <img src="/PaymentConfirm.png" alt="payment Done" />
      <h1 className="text-center text-2xl font-semibold">Congratulations!!</h1>
      <p className="text-gray-500 text-center">
        Dear Sir/Mam, thank you for uploading your prescription. Your order will
        be processed shortly after verification and confirmation from the
        pharmacist. Team QuickMedsRx
      </p>

      <button 
        className="bg-primary-500 text-white py-2 px-4 rounded-lg"
        onClick={handleTrackOrder}
      >
        Track Order
      </button>
      <button 
        className="border-orange-500 border-2 text-orange-500 py-2 px-4 rounded-lg"
        onClick={handleContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmPopUp;