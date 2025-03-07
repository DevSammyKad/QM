'use client';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import { Divider } from '@nextui-org/react';

import { Routes } from '@/routes.config';
import Link from 'next/link';
import Coupons from '../cart/coupons';
import BillSummary from './BillSummary';
import Address from '../cart/address';
import LabTestScheduler from './LabTestScheduler';
import { useState } from 'react';

type Props = {};

export default function LabTestPaymentDetail({}: Props) {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <Coupons />
      <Divider className="h-1" />
      <BillSummary />
      <Divider className="h-1" />
      <Address />

      {isSchedulerOpen && (
        <LabTestScheduler
          labTestId={1}
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
