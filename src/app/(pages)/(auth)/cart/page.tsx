type Props = {};
import Cart from '@/src/page/cart/cart';
import EmptyCart from '@/src/page/cart/empty-cart';
import PaymentDetail from '@/src/page/cart/payment-detail';

export default function page({}: Props) {
  const cartData = [
    {
      id: 2,
      imgUrl: '/tablet 1.png',
      title:
        'Zingavita Vitamin C Zinc Effervescent Tablets Natural Amla Extract for Strong Immunity (30 Tablets)',
      actualPrice: 150,
      isLiked: false,
      sellingPrice: 150,
      quantity: 1,
      variant: {
        id: 1,
        name: '30 Tablets',
        price: 93,
        price_per_unit: 9.3,
        in_stock: 5,
      },
    },
    {
      id: 2,
      imgUrl: '/tablet 1.png',
      title:
        'Zingavita Vitamin C Zinc Effervescent Tablets Natural Amla Extract for Strong Immunity (30 Tablets)',
      actualPrice: 150,
      isLiked: false,
      sellingPrice: 150,
      quantity: 3,
      variant: {
        id: 1,
        name: '30 Tablets',
        price: 93,
        price_per_unit: 9.3,
        in_stock: 5,
      },
    },
  ];
  return (
    <div className="w-full">
      {cartData.length > 0 ? (
        <div className="grid grid-cols-5 max-lg:gap-10 max-lg:grid-cols-1">
          <div className="col-span-3  max-lg:col-span-1 pr-10 max-lg:pr-0">
            <Cart cartData={cartData} />
          </div>
          <div className="col-span-2 max-lg:col-span-1 pl-10  max-lg:pl-0 border-l-2 max-lg:border-none">
            <PaymentDetail />
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
