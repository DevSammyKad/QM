'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import { CheckCircle, Clipboard, FileText, Loader2, Truck } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import FilterSvg from '@/src/icons/filterSvg';

// Order status types
export type OrderStatus = 'taken' | 'preparing' | 'delivering' | 'received';

interface OrderStatusInfo {
  id: OrderStatus;
  label: string;
  icon: string | React.ReactNode;
}

interface OrderTrackerProps {
  orderId: string;
}

export default function OrderTracker({ orderId }: OrderTrackerProps) {
  const [status, setStatus] = useState<OrderStatus>('delivering');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define the order statuses and their details
  const orderStatuses: OrderStatusInfo[] = [
    {
      id: 'taken',
      label: 'Order Taken',
      icon: '/OrderTakenImage.png',
    },
    {
      id: 'preparing',
      label: 'Order Is Being Prepared',
      icon: <FilterSvg />,
    },
    {
      id: 'delivering',
      label: 'Your delivery agent is coming',
      icon: <FilterSvg />,
    },
    {
      id: 'received',
      label: 'Order Received',
      icon: <FilterSvg />,
    },
  ];

  // Get the current status index
  const currentStatusIndex = orderStatuses.findIndex((s) => s.id === status);

  useEffect(() => {
    const getOrderStatus = async () => {
      try {
        setLoading(true);
        // const data = await fetchOrderStatus(orderId);
        // setStatus(data.status);
        setError(null);
      } catch (err) {
        setError('Failed to fetch order status');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getOrderStatus();

    // Poll for updates every 30 seconds
    const intervalId = setInterval(getOrderStatus, 30000);

    return () => clearInterval(intervalId);
  }, [orderId]);

  if (loading && !status) {
    return (
      <div className="flex justify-center items-center p-8">
        {/* <Loader2 className="h-8 w-8 animate-spin text-primary" /> */}
        <span className="ml-2">Loading order status...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        {error}. Using default status.
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-8">Track order</h2>

      <div className="relative">
        {/* Status indicators */}
        <div className="flex justify-between mb-2">
          {orderStatuses.map((orderStatus, index) => (
            <div key={orderStatus.id} className="flex flex-col items-center">
              <p
                className={cn(
                  'text-sm mb-2 text-center',
                  index <= currentStatusIndex
                    ? 'text-green-500 font-medium'
                    : 'text-gray-500'
                )}
              >
                {orderStatus.label}
              </p>

              <motion.div
                className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-full',
                  index <= currentStatusIndex ? 'bg-green-100' : 'bg-gray-100'
                )}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  backgroundColor:
                    index <= currentStatusIndex ? '#dcfce7' : '#f3f4f6',
                }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.5,
                }}
              >
                <div
                  className={cn(
                    'text-gray-500',
                    index <= currentStatusIndex && 'text-green-500'
                  )}
                >
                  {typeof orderStatus.icon === 'string' ? (
                    <img src={orderStatus.icon} alt="" />
                  ) : (
                    orderStatus.icon
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Progress line */}
        <div className="absolute top-[10.5rem] left-0 w-full h-0.5 bg-gray-200">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: '0%' }}
            animate={{
              width: `${
                (currentStatusIndex / (orderStatuses.length - 1)) * 100
              }%`,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>

        {/* Dotted lines between icons */}
        <div className="absolute top-[4.5rem] left-0 w-full flex justify-between">
          {orderStatuses.slice(0, -1).map((_, index) => (
            <div
              key={index}
              className="flex-1 flex justify-center items-center"
            >
              <div className="w-full border-t-2 border-dotted border-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
