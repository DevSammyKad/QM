import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const {
      order_amount,
      order_currency,
      order_id,
      customer_details,
      order_meta,
    } = await req.json();

    const url = 'https://sandbox.cashfree.com/pg/orders';

    const headers = {
      'x-client-id': '325104272bc8d5319a9aa2ad3d401523',
      'x-client-secret': '6715562e32ad262ee3766a4b730edba28e8908ce',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-version': '2023-08-01',
    };

    console.log('client id', process.env.CASHFREE_CLIENT_ID);
    console.log('client secret', process.env.CASHFREE_CLIENT_SECRET);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        order_amount,
        order_currency,
        order_id,
        customer_details,
        order_meta,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cashfree API Error:', errorData);
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
