import { load } from '@cashfreepayments/cashfree-js';
import { useEffect, useState } from 'react';

interface CashfreeSDK {
  checkout: (options: {
    paymentSessionId: string;
    redirectTarget?: string;
  }) => Promise<{
    error?: any;
    redirect?: boolean;
    paymentDetails?: {
      paymentMessage: string;
    };
  }>;
}

function CashFreeCheckout() {
  const [cashfree, setCashfree] = useState<CashfreeSDK | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      const sdk = await load({ mode: 'sandbox' }); // Change to 'production' when live
      setCashfree(sdk);
    };
    initializeSDK();
  }, []);

  const createOrder = async () => {
    setLoading(true);
    const orderId = `order_${Date.now()}`;

    try {
      const response = await fetch('/api/create-payment-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_amount: 1.0,
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
      } else {
        console.error('Order creation failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  const doPayment = async () => {
    if (!cashfree || !sessionId) {
      console.error('Cashfree SDK not loaded or session ID missing');
      return;
    }

    try {
      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: '_modal',
      };

      const result = await cashfree.checkout(checkoutOptions);

      if (result.error) {
        console.error('Payment Error:', result.error);
      } else if (result.redirect) {
        console.log('Payment will be redirected.');
      } else if (result.paymentDetails) {
        console.log('Payment Completed:', result.paymentDetails.paymentMessage);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Cashfree Payment</h1>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-md"
        onClick={createOrder}
        disabled={loading}
      >
        {loading ? 'Creating Order...' : 'Create Order'}
      </button>
      <button onClick={doPayment} disabled={!sessionId}>
        {sessionId ? 'Pay Now' : 'Waiting for Order...'}
      </button>
    </div>
  );
}

export default CashFreeCheckout;
