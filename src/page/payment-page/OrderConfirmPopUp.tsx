import Link from 'next/link';
import React from 'react';

interface OrderConfirmPopUpProps {
  TrackId: number | null;
}

const OrderConfirmPopUp = ({ TrackId }: OrderConfirmPopUpProps) => {
  if (TrackId === null) return null;

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <img src="/PaymentConfirm.png" alt="payment Done" />
      <h1 className="text-center text-2xl font-semibold">Congratulations!!</h1>
      <p className="text-gray-500 text-center">
        Dear Sir/Mam, thank you for uploading your prescription. Your order will
        be processed shortly after verification and confirmation from the
        pharmacist. Team QuickMedsRx
      </p>

      <Link
        href={`/track-lab-tests/${TrackId}`}
        className="bg-primary-500 text-white py-2 px-4 rounded-lg"
      >
        Track Order
      </Link>

      <button className="border-orange-500 border-2  text-orange-500 py-2 px-4 rounded-lg">
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmPopUp;
