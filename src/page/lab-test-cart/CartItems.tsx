'use client';
import Api, { header } from '@/src/app/(pages)/utils/Api';
import { Heart, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

type LabTestCartItemType = {
  id: number;
  userId: number;
  labTestId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  bannerImage: string;
  coverImage: string;
  testName: string;
  description: string;
  mrp: number;
  sellingPrice: number;
  preparations: string;
  sampleRequired: string;
  recommendedFor: string;
  others: string; // JSON string containing an array of objects with heading and body
  containsMultipleTest: string; // Appears to be a JSON string
  faq: string; // JSON string containing an array of objects with question and answer
};

type LabTestCartType = {
  labTestCart: LabTestCartItemType[];
  onCartUpdate?: () => void;
};

const defaultImageUrl = '/LabTestDummy.png';
const CartItems = ({ labTestCart, onCartUpdate }: LabTestCartType) => {
  const [deletingItem, setDeletingItem] = useState<number[]>([]);

  const handleRemoveItem = async (cartItemId: number) => {
    if (deletingItem.includes(cartItemId)) return;

    setDeletingItem((prev) => [...prev, cartItemId]);

    console.log('Removing Lab Test ID:', cartItemId);

    try {
      const response = await fetch(Api.LabTestRemoveFromCart(cartItemId), {
        method: 'DELETE',
        headers: header,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      toast.success('Item removed from cart');
      onCartUpdate?.();
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setDeletingItem((prev) => prev.filter((id) => id !== cartItemId));
    }
  };

  return (
    <div>
      {labTestCart.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-8">
            <img
              src={item.coverImage || '/public/LabTestDummy.png'}
              alt={item.testName}
              className="w-20 h-20 rounded-md object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImageUrl;
              }}
            />
            <div>
              <h3 className="font-medium text-gray-900">{item.testName}</h3>
              <div className="text-sm text-gray-500 my-2">
                Quantity: {item.quantity} · Variant: Lab Test
              </div>
              <div className="flex mt-2 gap-6">
                <button className="text-blue-500 text-sm flex items-center gap-1">
                  <Heart />
                  Save for later
                </button>
                <button
                  className="text-gray-500 text-sm flex items-center gap-1"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 /> Remove
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl">₹{item.sellingPrice}</div>
            <div className="text-gray-400 line-through">₹{item.mrp}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
