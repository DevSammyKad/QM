import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutForm = () => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null); // Stores the PayU payment URL
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const amount = 250; // Update amount
  const contact = '1234567890'; // Update contact number
  const url = process.env.NEXT_PUBLIC_BASE_URL; // Ensure this is set in your .env file

  const data = {
    txnid: 'id_of_item_purchased', // Replace with actual transaction ID
    amount: amount.toFixed(2), // Float
    productinfo: 'desc_of_item', // Replace with actual product info
    firstname: 'buyer_first_name', // Replace with actual buyer's first name
    email: 'buyer_email', // Replace with actual buyer's email
  };

  useEffect(() => {
    if (paymentUrl) {
      // Redirect to PayU payment gateway
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  const makePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Generate hash value
      const reshash = await axios.post(
        `${url}/api/payment`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Step 2: Prepare payment data
      const pd = {
        key: 'your_test_key', // Replace with your PayU test key
        txnid: data.txnid,
        amount: data.amount,
        firstname: data.firstname,
        email: data.email,
        phone: contact,
        productinfo: data.productinfo,
        surl: `${url}/api/response/test`, // Success URL
        furl: `${url}/api/response/failure`, // Failure URL
        hash: reshash.data.hash, // Hash value from the API
        service_provider: 'payu_paisa',
      };

      // Step 3: Get the PayU payment URL
      const res = await axios.post(`${url}/api/response`, JSON.stringify(pd), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Set the payment URL to trigger the redirect
      setPaymentUrl(res.data);
    } catch (err) {
      console.error('Payment Error:', err);
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={makePayment}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: isLoading ? '#ccc' : '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? 'Processing...' : 'Proceed to PayU Payment'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default CheckoutForm;
