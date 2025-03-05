import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OrdersList = () => {
  const orderId = '123456';
  return (
    <div className="bg-sky-50 ">
      <div className="flex items-center p-4">
        <span className="text-gray-500 mr-2">Deliver on</span>
        <span className="text-teal-500 font-medium">03-04-2024</span>
      </div>

      <div className="bg-white rounded-md shadow-sm p-4 ">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="w-24 h-24 relative mr-4 mb-4 md:mb-0">
            <Image
              src="/vitamin-c.png"
              alt="Vitamin C Bottle"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-lg text-gray-600 font-medium mb-1">
              Zinga vita Vitamin Amla Extract 1000mg Tablet
            </h3>
            <p className="text-gray-400 text-sm mb-3 max-w-xl">
              FastRUp Charge is a completely natural Vitamin C supplement that
              delivers immunity-boosting...
            </p>
            <div className="flex items-center">
              <span className="font-bold text-gray-800 mr-2">₹366</span>
              <span className="text-gray-400 line-through text-sm">₹999</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0 w-full md:w-auto">
            <Link href={`/track-orders/${orderId}`}>
              <button className="px-6 py-3 border border-orange-400 text-orange-500 rounded-md hover:bg-orange-50 transition-colors">
                Track order
              </button>
            </Link>
            <Link href={`/my-orders/${orderId}`}>
              <button className="px-6 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">
                See details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
