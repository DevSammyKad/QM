"use client";
import CartSvg from "@/src/icons/cartSvg";
import { ProductVariantType } from "@/src/types/productTypes";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import { useState } from "react";
import Address from "../cart/address";
import QuantityButtons from "./QuantityButtons";
import { toast } from "react-toastify"; // ✅ Import toast for success message


// Example of the function to add the item to the cart
const addToCart = async (variantData: ProductVariantType, quantity: number) => {
  try {
    const storedUserId = localStorage.getItem("userId");
    const selectedProductId = localStorage.getItem("selectedProductId");

    if (!storedUserId) {
      // Handle not logged in (optional)
      console.error("User is not logged in");
      return;
    }
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // Handle not logged in (optional)
      console.error("User is not logged in");
      return;
    }
    const response = await fetch("https://quickmeds.sndktech.online/productCart.add", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        userId: storedUserId,
        productId: selectedProductId,
        quantity: 1,
      }),
    });

    if (response.ok) {
              toast.success("Item added to the cart successfully!");
      
      // Handle the successful addition to the cart (optional)
      console.log("Item added to the cart successfully!");
    } else {
      // Handle API failure (optional)
      console.error("Failed to add item to the cart");
    }
  } catch (error) {
    // Handle error (optional)
    console.error("Error adding item to the cart:", error);
  }
};

type Props = {
  variantData: ProductVariantType;
};

export default function BuyButton({ variantData }: Props) {
  const [quantity, setQuantity] = useState(1);
  const price = Number(variantData.sellingPrice) || 0; // Use sellingPrice instead

  const decreaseHandler = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseHandler = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = async () => {
    // Call the addToCart function when the button is clicked
    await addToCart(variantData, quantity);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2 items-center">
        <div className="flex flex-col">
          <p className="text-3xl max-sm:text-xl font-semibold">
            ₹{(price * quantity).toFixed(2)}
          </p>
          <p className="text-shade max-sm:text-sm">
            Total payable: ₹{(price * quantity).toFixed(2)}
          </p>
        </div>
        <QuantityButtons
          decreaseHandler={decreaseHandler}
          increaseHandler={increaseHandler}
          quantity={quantity}
        />
      </div>
      <div className="flex flex-col gap-2 max-sm:gap-0">
        {/* <Address small /> */}
        <PrimaryButton
          startContent={<CartSvg fillColor="#ffffff" />}
          className="rounded-3xl py-3 mt-2 max-sm:py-2 font-semibold justify-start"
          onClick={handleAddToCart} // Call the handler function on button click
        >
          <p className="flex-1 text-center">Add to Cart</p>
        </PrimaryButton>
      </div>
    </div>
  );
}
