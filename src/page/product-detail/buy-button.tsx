"use client";
import CartSvg from "@/src/icons/cartSvg";
import { ProductVariantType } from "@/src/types/productTypes";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import { useState } from "react";
import Address from "../cart/address";
import QuantityButtons from "./QuantityButtons";

type Props = {
  variantData: ProductVariantType;
};

export default function BuyButton({ variantData }: Props) {
  const [quantity, setQuantity] = useState(1);
  const decreaseHandler = () => {
    setQuantity(quantity === 1 ? 1 : quantity - 1);
  };
  const increaseHandler = () => {
    setQuantity(quantity < variantData.in_stock ? quantity + 1 : quantity);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2 items-center">
        <div className="flex flex-col">
          <p className="text-3xl max-sm:text-xl font-semibold ">
            ₹{variantData.price}
          </p>
          <p className="text-shade max-sm:text-sm">Total payable</p>
        </div>
        <QuantityButtons
          decreaseHandler={decreaseHandler}
          increaseHandler={increaseHandler}
          quantity={quantity}
        />
      </div>
      <div className="flex flex-col gap-2 max-sm:gap-0">
        <Address small />
        <PrimaryButton
          startContent={<CartSvg fillColor="#ffffff" />}
          className="rounded-3xl py-3 mt-2 max-sm:py-2 font-semibold justify-start"
        >
          <p className="flex-1 text-center">Add to Cart</p>
        </PrimaryButton>
      </div>
    </div>
  );
}
