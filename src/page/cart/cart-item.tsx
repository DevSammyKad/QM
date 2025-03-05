// "use client";
import ImgTab from '@/src/components/imgTab/img-tab';
import DeleteSvg from '@/src/icons/deleteSvg';
import HeartSvg from '@/src/icons/heartSvg';
import { useState } from 'react';
import QuantityButtons from '../product-detail/QuantityButtons';
import { CartDataType } from './cart';

type Props = {
  cartItem: CartDataType;
};

export default function CartItem({ cartItem }: Props) {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const decreaseHandler = () => {
    setQuantity(quantity === 1 ? 1 : quantity - 1);
  };

  const increaseHandler = () => {
    setQuantity(quantity < cartItem.variant.in_stock ? quantity + 1 : quantity);
  };

  // Check if variant is defined before accessing properties
  const variant = cartItem.variants;
  const productTitle = cartItem.productName || 'Untitled Product'; // Fallback for title
  const productImgUrl = cartItem.images || 'default-image-url'; // Fallback for image URL

  return (
    <div className="grid gap-y-0 grid-cols-[max-content_1fr_max-content]  items-center gap-2 max-sm:gap-0 ">
      <ImgTab
        src={productImgUrl}
        alt="cart-item"
        className="w-[80] h-[130px] max-sm:w-[60px] max-sm:h-[100px]  object-contain aspect-auto"
      />
      <div className="flex flex-col max-sm:pl-1 justify-between gap-1 py-2">
        <p className="text-lg max-lg:text-base max-sm:text-sm font-semibold">
          {productTitle}
        </p>
        <div className="text-shade text-xs flex items-center gap-4">
          <p>Quantity: {cartItem.quantity}</p>
          <p>Variant: {variant?.name || 'Unknown Variant'}</p>
        </div>
        <div className="text-shade  max-sm:hidden text-sm flex items-center gap-4">
          <p className="flex items-center gap-1">
            <HeartSvg width={18} /> Save for later
          </p>
          <p className="border-l flex items-center gap-1">
            <DeleteSvg /> Remove
          </p>
        </div>
      </div>
      <div
        className="flex flex-col items-center 
       gap-3 pl-5 max-sm:pl-1"
      >
        <p className="text-xl max-[500px]:text-base font-bold ">
          <span>₹{cartItem.sellingPrice}</span>
          <s className="text-shade pl-1">₹{cartItem.actualPrice}</s>
        </p>
        <QuantityButtons
          wrapperClass="bg-white border text-base"
          decreaseHandler={decreaseHandler}
          increaseHandler={increaseHandler}
          quantity={quantity}
        />
      </div>
      <div
        className="max-sm:flex hidden   justify-between text-shade items-center col-span-3
      pl-5"
      >
        <p className="flex items-center gap-1 w-1/2 justify-center ">
          <HeartSvg width={18} /> Save for later
        </p>
        <p className="border-l-2 flex items-center gap-1 w-1/2 justify-center ">
          <DeleteSvg /> Remove
        </p>
      </div>
    </div>
  );
}
