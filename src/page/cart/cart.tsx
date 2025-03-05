'use client';
import { useEffect, useState } from 'react';
import { loginObserver } from '@/src/observers/observable';
import CartItem from './cart-item';
import CartSuggested from './cart-suggested';
import { CartDataType } from './cart';
import Api from '../utils/Api';
import { header } from '../utils/Api';
import MyPrescriptionsButton from './MyPrescriptionsButton';

export default function Cart() {
  const [cartData, setCartData] = useState<CartDataType[]>([]); // Store cart data from API
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(''); // Error state

  // Fetch cart data from the API
  const fetchCartData = async () => {
    try {
      const response = await fetch(Api.ProductCartData, {
        method: 'GET',
        headers: header,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.productCarts) {
          setCartData(data.productCarts); // Set the cart data
        } else {
          setError('No cart data available');
        }
      } else {
        setError('Failed to fetch cart data');
      }
    } catch (err) {
      setError('Error occurred while fetching data');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch cart data when the component mounts
  useEffect(() => {
    loginObserver.notify(true); // Trigger login function when the component first loads
    fetchCartData(); // Fetch data from API
  }, []);

  // Show loading state while fetching data
  if (loading) {
    return <div>Loading cart...</div>;
  }

  // Show error message if fetching failed
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-5 ">
      <p className="text-2xl font-semibold">{cartData.length} items added</p>
      {cartData.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <MyPrescriptionsButton />
      <CartSuggested randomData={cartData} />
    </div>
  );
}
