'use client';
import React, { use, useEffect, useState } from 'react';
import Address from '@/src/page/cart/address';
import Bill from '@/src/page/cart/bill';
import { OutLinedButton } from '@/src/ui/buttons/buttons';
import Image from 'next/image';
import { dummyProductCardData } from '@/dummyData';
import LabTestTracker from '@/src/page/lab-test-tracking/LabTestTracker';
import BillSummary from '@/src/page/lab-test-cart/BillSummary';
import Api, { header } from '../../../utils/Api';
import ImgTab from '@/src/components/imgTab/img-tab';

const data = dummyProductCardData.slice(0, 3);

interface TestBooking {
  cartMrp: number;
  image: string;
  status: string;
  title: string;
  id: number;
  slot_time: string;
  slot_date: Date;
  totalPayment: number;
  otherServices: number;
  totalDiscount: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const [testBooking, setTestBooking] = useState<TestBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const bookingId = Number(params.id);

  const defaultImageUrl = '/HealthCheckUpImage.png';

  useEffect(() => {
    if (!bookingId) return;

    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching:', Api.LabTestTracking(bookingId));

        const response = await fetch(Api.LabTestTracking(bookingId), {
          method: 'GET',
          headers: header,
        });

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (!data.status || !data.TestBooking)
          throw new Error('Invalid API response');

        setTestBooking(data.TestBooking);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  console.log('bookingId', bookingId);

  if (!testBooking) return <div>Loading booking details...</div>;

  return (
    <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 justify-items-center">
      <div className="w-full lg:col-span-2">
        <LabTestTracker bookingId={bookingId} />
        <div className=" bg-white shadow-sm my-5">
          <div className="text-sm text-gray-500 p-4">
            Arriving by:{' '}
            {new Intl.DateTimeFormat('US-IN').format(
              new Date(testBooking.slot_date)
            )}
            <div className="flex space-x-3">
              <span className="text-sm text-gray-500">Time Slot:</span>
              <span className="text-sm">{testBooking.slot_time}</span>
            </div>
            <span className="float-right">1/1</span>
          </div>

          <div className="border-t border-gray-100">
            {/* First Product */}

            <div className="flex items-center justify-center p-4 gap-4">
              <div className="w-26 h-26 bg-gray-100 rounded-md overflow-hidden relative">
                <ImgTab
                  src={testBooking.image || defaultImageUrl}
                  alt="Medical test"
                  width={180}
                  height={180}
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultImageUrl;
                  }}
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{testBooking.title}</h3>
                <p className="text-sm text-orange-500">
                  E-report by{' '}
                  {new Intl.DateTimeFormat('US-IN').format(
                    new Date(testBooking.slot_date)
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹ {testBooking.totalPayment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col ">
        {testBooking && (
          <BillSummary
            cartMrp={testBooking.cartMrp}
            totalPayment={testBooking.totalPayment}
            otherServices={testBooking.otherServices}
            totalDiscount={testBooking.totalDiscount}
          />
        )}

        <div className="my-4">
          <Address />
        </div>
        <div className="flex flex-col gap-4  my-5">
          <OutLinedButton>Cancel Order</OutLinedButton>
        </div>
      </div>
    </div>
  );
}
