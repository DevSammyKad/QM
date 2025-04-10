'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Api, { header } from '@/src/app/(pages)/utils/Api';

export type OrderStatus = 'taken' | 'Pending' | 'delivering' | 'received';

interface LabTestTrackerProps {
  bookingId: number;
}

interface TestBooking {
  cartMrp: number;
  image: string;
  status: string;
  title: string;
  id: number;
  slot_time: string;
  slot_date: Date;
  finalOrderStatus?: string;
}

const TRACKING_STEPS = ['Pending', 'Progress', 'Completed'];

const TRACKING_IMAGES = [
  '/LabTestPending.png',
  '/LabTestProgress.png',
  '/whatsappIcon.png',
];

export default function LabTestTracker({ bookingId }: LabTestTrackerProps) {
  const [testBooking, setTestBooking] = useState<TestBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading)
    return (
      <div className="flex justify-center py-8">
        Loading tracking information...
      </div>
    );
  if (error)
    return <div className="text-red-500 py-8 text-center">Error: {error}</div>;
  if (!testBooking)
    return (
      <div className="text-gray-500 py-8 text-center">
        No booking information found
      </div>
    );

  const currentStatus =
    testBooking.finalOrderStatus || testBooking.status || 'Pending';

  const isCancelled = currentStatus.toLowerCase() === 'cancelled';
  const currentStep = isCancelled
    ? -1
    : TRACKING_STEPS.findIndex((step) =>
        currentStatus.toLowerCase().includes(step.toLowerCase())
      );

  return (
    <div className="w-full  mx-auto bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-start mb-2">Track Order</h2>
      <div
        className={`text-start mb-6 text-sm ${
          currentStatus === 'Cancelled' ? 'text-red-500' : 'text-green-500'
        }`}
      >
        {currentStatus === 'Cancelled'
          ? 'Booking Cancelled'
          : 'Booking Confirmed'}
      </div>

      <div className="relative">
        <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200"></div>
        <motion.div
          className={`absolute top-12 left-0 h-0.5 ${
            isCancelled ? 'bg-red-500' : 'bg-green-500'
          }`}
          initial={{ width: '0%' }}
          animate={{
            width: isCancelled
              ? '100%'
              : `${
                  Math.max(currentStep / (TRACKING_STEPS.length - 1), 0) * 100
                }%`,
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        <div className="flex justify-between relative z-10">
          {TRACKING_STEPS.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <motion.div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${
                  currentStep >= index ? 'bg-green-100' : 'bg-gray-100'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Image
                  src={TRACKING_IMAGES[index]}
                  alt={step}
                  width={30}
                  height={30}
                  className={currentStep >= index ? '' : 'grayscale'}
                />
              </motion.div>
              <p
                className={`mt-2 text-xs ${
                  currentStep >= index ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mt-12 border-t pt-6">
        <h3 className="font-semibold mb-4">Booking Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {testBooking.image && (
                <Image
                  src={testBooking.image}
                  alt={testBooking.title}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <h4 className="font-medium text-sm">{testBooking.title}</h4>
              <p className="text-xs text-gray-500">ID: {testBooking.id}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Appointment Date:</span>
              <span className="text-sm">
                {new Intl.DateTimeFormat('en-US').format(
                  new Date(testBooking.slot_date)
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Time Slot:</span>
              <span className="text-sm">{testBooking.slot_time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Status:</span>
              <span
                className={`text-sm font-medium ${
                  currentStatus === 'Cancelled'
                    ? 'text-red-500'
                    : currentStatus === 'Completed'
                    ? 'text-green-500'
                    : 'text-blue-500'
                }`}
              >
                {currentStatus}
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
