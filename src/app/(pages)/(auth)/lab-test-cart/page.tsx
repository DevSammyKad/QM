'use client';

import { useState, useEffect } from 'react';
import Api, { header } from '../../utils/Api';
import EmptyCart from '@/src/page/cart/empty-cart';
import CartItems from '@/src/page/lab-test-cart/CartItems';
import LabTestPaymentDetail from '@/src/page/lab-test-cart/LabTestPaymentDetail';

export default function Page() {
  const [labTestCartData, setLabTestCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = 1; // Replace with dynamic user ID if needed
    fetchLabTestCart(userId);
  }, []);

  const fetchLabTestCart = async (userId: number) => {
    try {
      const response = await fetch(Api.LabTestCart(userId), {
        method: 'GET',
        headers: header,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }

      const data = await response.json();
      console.log(data);
      setLabTestCartData(data.labTestCart || []);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full">
      {labTestCartData.length > 0 ? (
        <div className="grid grid-cols-5 max-lg:gap-10 max-lg:grid-cols-1">
          <div className="col-span-3  max-lg:col-span-1 pr-10 max-lg:pr-0">
            <div className="w-full flex flex-col gap-5">
              <p className="text-2xl font-semibold">
                {labTestCartData.length} items added
              </p>
              <CartItems labTestCart={labTestCartData} status={true} />
              {/* {labTestCartData.map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))} */}
              {/* <CartSuggested randomData={labTestCartData} /> */}
            </div>
          </div>
          <div className="col-span-2 max-lg:col-span-1 pl-10  max-lg:pl-0 border-l-2 max-lg:border-none">
            <LabTestPaymentDetail />
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
