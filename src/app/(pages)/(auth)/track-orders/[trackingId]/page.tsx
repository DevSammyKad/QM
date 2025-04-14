'use client';

import React, { useEffect, useState } from 'react';
import OrderTracker from '@/src/page/track-orders/OrderTracker';
import Image from 'next/image';
import Address from '@/src/page/cart/address';
import Bill from '@/src/page/cart/bill';
import { OutLinedButton } from '@/src/ui/buttons/buttons';

const Page = () => {
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const track_order_id = localStorage.getItem('track_order_id');
      if (!track_order_id) return;

      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) {
        console.error('Authentication token not found');
        return;
      }

      try {
        const response = await fetch(
          `https://quickmeds.sndktech.online/OrderDetails/${track_order_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`,
              'x-authorization':
                'RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph',
            },
          }
        );

        const result = await response.json();
        if (result.status) {
          setData(result.adminOrder.products);
          setTotalAmount(result.adminOrder.amount); // Store the total amount
        } else {
          console.error('Failed to fetch order details');
        }
      } catch (err) {
        console.error('Error fetching order details', err);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 justify-items-center">
      <div className="w-full lg:col-span-2">
        <OrderTracker orderId="123456" />
        <div className="bg-white shadow-sm my-5">
          <div className="text-sm text-gray-500 p-4">
            Arriving <span className="float-right">1/1</span>
          </div>

          <div className="border-t border-gray-100">
            {data.length > 0 ? (
              data.map((product, index) => (
                <div key={index} className="flex p-4 border-b border-gray-100">
                  <div className="w-16 h-16 relative mr-4">
                    <Image
                      src={product.images?.[0] || '/placeholder.jpg'}
                      alt={product.productName}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">
                      {product.productName}
                    </h3>
                    <p className="text-orange-500 text-xs mb-1">
                      {product.brand}
                    </p>
                    <div className="flex justify-between items-center">
                      {/* Show total amount instead of individual selling price */}
                      <span className="font-bold">₹{totalAmount}</span>
                      <span className="text-gray-400 line-through text-sm">
                        ₹{product.mrp}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 text-gray-500">No products found</p>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-4">
              <Bill />
              <Address />
              <div className="flex flex-col gap-4">
                <OutLinedButton>Cancel Order</OutLinedButton>
              </div>
            </div> */}
    </div>
  );
};

export default Page;
