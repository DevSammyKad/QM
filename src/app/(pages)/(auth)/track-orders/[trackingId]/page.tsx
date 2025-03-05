import React from 'react';
import Address from '@/src/page/cart/address';
import Bill from '@/src/page/cart/bill';
import OrderTracker from '@/src/page/track-orders/OrderTracker';
import { OutLinedButton } from '@/src/ui/buttons/buttons';
import Image from 'next/image';
import { dummyProductCardData } from '@/dummyData';

const data = dummyProductCardData.slice(0, 5);

// This We can show search and all tracking details

const page = () => {
  return (
    <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 justify-items-center">
      <div className="w-full lg:col-span-2">
        <OrderTracker orderId="123456" />
        <div className=" bg-white shadow-sm my-5">
          <div className="text-sm text-gray-500 p-4">
            Arriving by Tue, 19 Mar
            <span className="float-right">1/1</span>
          </div>

          <div className="border-t border-gray-100">
            {/* First Product */}
            {data.map((order) => (
              <div className="flex p-4 border-b border-gray-100">
                <div className="w-16 h-16 relative mr-4">
                  <Image
                    src={order.imgUrl}
                    alt={order.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-sm mb-1">{order.title}</h3>
                  <p className="text-orange-500 text-xs mb-1">{order.title}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">₹{order.sellingPrice}</span>
                    <span className="text-gray-400 line-through text-sm">
                      ₹{order.actualPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Bill />
        <Address />
        <div className="flex flex-col gap-4">
          <OutLinedButton>Cancel Order</OutLinedButton>
        </div>
      </div>
    </div>
  );
};

export default page;
