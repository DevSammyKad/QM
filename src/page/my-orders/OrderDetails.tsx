'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { OutLinedButton, PrimaryButton } from '@/src/ui/buttons/buttons';

import DialogWrapper from '@/src/ui/dialog-wrapper.tsx/dialog-wrapper';
import CrossSvg from '@/src/icons/crossSvg';
import CustomCheckbox from '@/src/ui/checkbox/checkbox';

const OrderDetails = () => {
  const [openOrderCancelPopUp, setOpenOrderCancelPopUp] =
    useState<boolean>(false);
  const openOrderCancelPopUpHandler = () => {
    setOpenOrderCancelPopUp(true);
  };
  const closeOrderCancelPopUpHandler = () => {
    setOpenOrderCancelPopUp(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Order details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex">
              <div className="w-1/2">
                <p className="text-gray-500 mb-1">Deliver on</p>
                <p className="text-teal-500 text-xl font-medium">03-04-2024</p>
              </div>
              <div className="w-1/2">
                <p className="text-gray-500 mb-1">Order id</p>
                <p className="text-gray-700">Iron man: po10659829l1-776</p>
                <p className="text-gray-500 mt-3 mb-1">Order date</p>
                <p className="text-gray-700">6 Mar, 10:30 AM</p>
              </div>
            </div>
          </div>

          {/* Appointment Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 mr-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 font-medium">
                  29 Feb 2024, 12 PM - 1PM
                </p>
                <p className="text-gray-400 text-sm">Sample collation slot</p>
              </div>
              <button className="text-teal-500 font-medium">Change</button>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 mr-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 font-medium">
                  Office (Ashar it 402,thane)
                </p>
                <p className="text-gray-400 text-sm">
                  Sample collation address
                </p>
              </div>
              <button className="text-teal-500 font-medium">Change</button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-gray-600 text-lg mb-4">
              Need help with your booking?
            </h3>

            <div className="flex items-start mb-6">
              <div className="w-10 h-10 mr-3 text-blue-500 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 font-medium">+91 09876543​21</p>
                <p className="text-gray-400 text-sm">
                  Call our health adviser to book, our team of experts will
                  guide you
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 mr-3 text-green-500 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 font-medium">+91 09876543​21</p>
                <p className="text-gray-400 text-sm">
                  Chat with our quick meds expert & tell us about your lab
                  booking needs
                </p>
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <OutLinedButton
            onClick={openOrderCancelPopUpHandler}
            className="w-full py-4 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-colors"
          >
            Cancel order
          </OutLinedButton>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-gray-500 mb-4">Product</h3>
            <div className="flex">
              <div className="w-20 h-20 relative mr-4">
                <Image
                  src="/vitamin-c.png"
                  alt="Vitamin C Bottle"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-gray-700 font-medium">
                  Zinga vita Vitamin Amla Extract 1000mg Tablet
                </h4>
                <p className="text-gray-400 text-sm">
                  FastRUp Charge is a completely natural Vitamin C supplement
                  that delivers immunity-boosting...
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-gray-500 mb-4">Bill summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between pb-2">
                <span className="text-gray-600">Cart MRP</span>
                <span className="text-gray-700">₹600</span>
              </div>

              <div className="flex justify-between pb-2">
                <span className="text-gray-600">Other services</span>
                <span className="text-gray-700">₹19</span>
              </div>

              <div className="flex justify-between pb-2 border-b">
                <span className="text-gray-600">Total discount</span>
                <span className="text-green-600">-₹100</span>
              </div>

              <div className="flex justify-between pt-2 font-medium">
                <span className="text-gray-700">To be paid</span>
                <span className="text-gray-900">₹500</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-teal-500 font-medium mb-2">
              Collection slot confirmed
            </h3>
            <p className="text-gray-500 mb-6">
              Phlebotomist details will be updated 2 hours before collection
              time.
            </p>

            <button className="w-full py-4 bg-white border border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
              Pay online
            </button>
          </div>
        </div>
      </div>
      <DialogWrapper
        open={openOrderCancelPopUp}
        onClose={closeOrderCancelPopUpHandler}
        closeBtnIcon={<CrossSvg />}
        className="w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
        title="Reason for cancellation"
      >
        <div className="flex flex-col gap-5 ">
          <p className="text-gray-500 text-sm">
            Please tell us the reason for cancellation. This helps us to improve
            our services
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CustomCheckbox />I have changed my mind
            </div>
            <div className="flex items-center gap-2">
              <CustomCheckbox />I bought the wrong item(s)
            </div>
            <div className="flex items-center gap-2">
              <CustomCheckbox />I found a cheaper alternative
            </div>
            <div className="flex items-center gap-2">
              <CustomCheckbox />I placed a duplicate order
            </div>
            <div className="flex items-center gap-2">
              <CustomCheckbox />I received negative feedback about the item
              after purchase
            </div>
            <div className="flex items-center gap-2">
              <CustomCheckbox />
              Delivery takes too long
            </div>
            <div className="flex items-center gap-2">
              <CustomCheckbox />
              Other
            </div>

            <PrimaryButton className="mt-3">Cancel order</PrimaryButton>
          </div>
        </div>
      </DialogWrapper>
    </div>
  );
};

export default OrderDetails;
