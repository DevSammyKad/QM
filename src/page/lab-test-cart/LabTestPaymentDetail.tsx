'use client';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import { Divider } from '@nextui-org/react';

import { Routes } from '@/routes.config';
import Link from 'next/link';
import Coupons from '../cart/coupons';
import BillSummary from './BillSummary';
import Address from '../cart/address';
import LabTestScheduler from './LabTestScheduler';
import { useEffect, useState } from 'react';
import Api, { header } from '@/src/app/(pages)/utils/Api';

type Props = {};

interface TestBooking {
  id: number;
  userId: number;
  labTestId: string;
  patientId: string; // JSON string; consider parsing if needed
  sampleCollectionDate: string;
  sampleCollectionAddress: string | null;
  note: string | null;
  otherDetails: string | null;
  status: string;
  slot_price: string | null;
  slot_time: string;
  slot_date: string;
  isDefault: boolean;
  cancelReason: string | null;
  cartMrp: string;
  otherServices: string;
  totalDiscount: string;
  totalPayment: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  image: string;
}

export default function LabTestPaymentDetail({}: Props) {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  const [cartData, setCartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [labTestId, setLabTestId] = useState(1);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await fetch(Api.LabTestCart(1), {
        method: 'GET',
        headers: header,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }

      const data = await response.json();
      if (Array.isArray(data.labTestCart) && data.labTestCart.length > 0) {
        setLabTestId(data.labTestCart[0].labTestId); // Fix: Access first item in array
      }

      setCartData(data.labTestCart || []);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const totalMRP = cartData.reduce((sum, item) => sum + item.mrp, 0);
  const totalDiscount = cartData.reduce(
    (sum, item) => sum + (item.mrp - item.sellingPrice),
    0
  );
  const gstRate = 0.12; // 12% GST
  const otherServices = totalMRP * gstRate; // GST applied on MRP
  const totalPayable = totalMRP - totalDiscount + otherServices;

  return (
    <div className="flex flex-col gap-6">
      <Coupons />
      <Divider className="h-1" />
      {/* {cartData ? (
        <BillSummary
          cartMrp={cartData.cartMrp}
          otherServices={cartData.otherServices}
          totalDiscount={cartData.totalDiscount}
          totalPayment={cartData.totalPayment}
        />
      ) : (
        <p>Loading bill details...</p>
      )} */}
      <div className="flex flex-col gap-3">
        <p className="text-[22px] font-semibold">Bill Summary</p>
        <div className="text-shade flex flex-col gap-2">
          <p className="flex items-center justify-between gap-3">
            <span>Cart MRP</span>
            <span>₹{totalMRP.toFixed(2)}</span>
          </p>
          <p className="flex items-center justify-between gap-3">
            <span>Other services</span>
            <span>₹{otherServices.toFixed(2)}</span>
          </p>
          <p className="flex items-center justify-between gap-3">
            <span>Total discount</span>
            <span className="text-green-500">-₹{totalDiscount.toFixed(2)}</span>
          </p>
          <Divider />
          <p className="flex text-black font-semibold text-xl items-center justify-between gap-3">
            <span>To be paid</span>
            <span>₹{totalPayable.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <Divider className="h-1" />
      <Address />
      {isSchedulerOpen && (
        <LabTestScheduler
          cartData={cartData}
          labTestId={labTestId}
          onClose={() => setIsSchedulerOpen(false)}
        />
      )}
      <PrimaryButton
        className="rounded-2xl"
        onClick={() => setIsSchedulerOpen(true)}
      >
        Continue
      </PrimaryButton>
    </div>
  );
}
