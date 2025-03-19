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
  return (
    <div className="flex flex-col gap-6">
      <Coupons />
      <Divider className="h-1" />
      <BillSummary cartData={cartData} />
      <Divider className="h-1" />
      <Address />
      what is lab id {labTestId}
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
