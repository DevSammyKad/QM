'use client';
import CrossSvg from '@/src/icons/crossSvg';
import OrderConfirmPopUp from '@/src/page/payment-page/OrderConfirmPopUp';
import { PrimaryButton, OutLinedButton } from '@/src/ui/buttons/buttons';
import DialogWrapper from '@/src/ui/dialog-wrapper.tsx/dialog-wrapper';
import { Divider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { load } from '@cashfreepayments/cashfree-js';
import Api, { header } from '../../utils/Api';
import BillSummary from '@/src/page/lab-test-cart/BillSummary';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

interface TestBooking {
  id: number;
  userId: number;
  labTestId: number;
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
  cartMrp: number;
  otherServices: number;
  totalDiscount: number;
  totalPayment: number;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  image: string;
}

const PaymentPage = () => {
  const [openOrderConfirmPopUp, setOpenOrderConfirmPopUp] = useState(false);
  const [cashfree, setCashfree] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [cartData, setCartData] = useState<TestBooking | null>(null);
  // or any default number

  const searchParams = useSearchParams();

  const bookingId = searchParams.get('bookingId');

  const numericBookingId = bookingId ? Number(bookingId) : null;

  useEffect(() => {
    if (!bookingId) return;
    fetchLabTestBookingSummary(Number(bookingId));
  }, [bookingId]);

  console.log('Payment Working bookingId', bookingId);

  console.log('Payment Working', cartData);

  const fetchLabTestBookingSummary = async (bookingId: number) => {
    try {
      const response = await fetch(Api.LabTestBookingSummary(bookingId), {
        method: 'GET',
        headers: header,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }

      const data = await response.json();
      console.log('Booking Summary Data', data.TestBooking);

      if (!data.TestBooking) {
        throw new Error('Could not find booking data');
      }

      setCartData(data.TestBooking); // Ensure it's correctly assigned
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeSDK = async () => {
      const sdk = await load({ mode: 'sandbox' }); // Change to 'production' when live
      setCashfree(sdk);
    };
    initializeSDK();
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    console.log('Cart Payment Data: ', cartData);

    if (!cartData || !cartData.totalPayment) {
      console.error('Total payment amount is missing or invalid.');
      toast.error('Total payment amount is missing or invalid.');
      return;
    }
    const orderId = cartData.orderId;
    const orderAmount = Number(cartData.totalPayment); // Ensure it's

    if (isNaN(orderAmount)) {
      toast.error('Invalid payment amount.');
      return;
    }
    try {
      const response = await fetch('/api/create-payment-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_amount: orderAmount.toFixed(2),
          order_currency: 'INR',
          order_id: orderId,
          customer_details: {
            customer_id: 'devstudio_user',
            customer_phone: '8474090589',
          },
          order_meta: {
            return_url: `https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id=${orderId}`,
          },
        }),
      });

      const data = await response.json();
      if (response.ok && data.payment_session_id) {
        setSessionId(data.payment_session_id);
        console.log('Payment Session ID:', data.payment_session_id);

        // Proceed with payment
        if (cashfree) {
          const result = await cashfree.checkout({
            paymentSessionId: data.payment_session_id,
            redirectTarget: '_modal',
          });

          if (result.error) {
            console.error('Payment Error:', result.error);
          } else if (result.redirect) {
            console.log('Redirecting for payment...');
          } else if (result.paymentDetails) {
            console.log(
              'Payment Completed:',
              result.paymentDetails.paymentMessage
            );
            setOpenOrderConfirmPopUp(true); // Open Order Confirmation Popup
          }
        }
      } else {
        console.error('Order creation failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 bg-gray-50">
      {/* Payment Success Dialog */}
      <DialogWrapper
        open={openOrderConfirmPopUp}
        onClose={() => setOpenOrderConfirmPopUp(false)}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
      >
        <OrderConfirmPopUp TrackId={numericBookingId} />
      </DialogWrapper>

      {/* Payment Container */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-semibold mb-6">Complete Your Payment</h2>
        {cartData ? (
          <BillSummary
            cartMrp={cartData.cartMrp}
            otherServices={cartData.otherServices}
            totalDiscount={cartData.totalDiscount}
            totalPayment={cartData.totalPayment}
          />
        ) : (
          <p>Loading bill details...</p>
        )}

        <Divider className="h-1 my-4" />

        <PrimaryButton
          className="rounded-2xl w-full py-3 text-lg"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay & Place Order'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PaymentPage;
