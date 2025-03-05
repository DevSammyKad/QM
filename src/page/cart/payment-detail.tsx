import { PrimaryButton } from '@/src/ui/buttons/buttons';
import { Divider } from '@nextui-org/react';
import Address from './address';
import Bill from './bill';
import Coupons from './coupons';
import { Routes } from '@/routes.config';
import Link from 'next/link';

type Props = {};

export default function PaymentDetail({}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <Coupons />
      <Divider className="h-1" />
      <Bill />
      <Divider className="h-1" />
      <Address />

      <Link href={Routes.payment}>
        <PrimaryButton className="rounded-2xl">
          Proceed to payment
        </PrimaryButton>
      </Link>
    </div>
  );
}
