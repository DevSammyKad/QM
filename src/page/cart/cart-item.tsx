import ImgTab from "@/src/components/imgTab/img-tab";
import DeleteSvg from "@/src/icons/deleteSvg";
import HeartSvg from "@/src/icons/heartSvg";
import { useState } from "react";
import QuantityButtons from "../product-detail/QuantityButtons";
import { CartDataType } from "./cart";
import Api from "../utils/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  cartItem: CartDataType;
  onUpdateCart: () => void; // Function to update cart & bill
};

export default function CartItem({ cartItem, onUpdateCart }: Props) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const product = cartItem.product;
  const productTitle = product?.productName || "Untitled Product";

  const productImages =
    product?.images && typeof product.images === "string"
      ? JSON.parse(product.images)
      : [];
  const productImgUrl =
    productImages.length > 0 ? productImages[0] : "/default-image.jpg";

  const variants =
    product?.variants && typeof product.variants === "string"
      ? JSON.parse(product.variants)
      : [];
  const variantName =
    variants.length > 0 ? variants[0].units || "Default Variant" : "Unknown";

  // ✅ Quantity Update Function (PUT API Call)
  const updateQuantity = async (newQuantity: number) => {
    if (isUpdating) return;
    setIsUpdating(true);

    // ✅ UI Immediately Update (Product Hide ના થાય)
    setQuantity(newQuantity);

    try {
      const response = await fetch(
        `https://quickmeds.sndktech.online/productCart.update/${cartItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status) {
        toast.success("Product quantity updated successfully!");
        onUpdateCart(); // ✅ Cart Update (No Refresh)
      } else {
        throw new Error(data.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Error updating quantity. Please try again.");

      // ⏪ If API fails, restore the previous quantity
      setQuantity(cartItem.quantity);
    } finally {
      setIsUpdating(false);
    }
  };

  // ✅ Decrease Quantity
  const decreaseHandler = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
  };

  // ✅ Increase Quantity
  const increaseHandler = () => {
    updateQuantity(quantity + 1);
  };

  // ✅ Remove Item from Cart (DELETE API Call)
  const removeItem = async () => {
    try {
      const response = await fetch(
        `https://quickmeds.sndktech.online/productCart.remove/${cartItem.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          },
        }
      );

      if (response.ok) {
        toast.success("Item removed from cart successfully!");
        onUpdateCart(); // 🔥 Update cart after removing
      } else {
        toast.error("Failed to remove item. Try again!");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="grid gap-y-0 grid-cols-[max-content_1fr_max-content] items-center gap-2 max-sm:gap-0">
      <ImgTab
        src={productImgUrl}
        alt="cart-item"
        className="w-[80px] h-[130px] max-sm:w-[60px] max-sm:h-[100px] object-contain"
      />
      <div className="flex flex-col max-sm:pl-1 justify-between gap-1 py-2">
        <p className="text-lg max-lg:text-base max-sm:text-sm font-semibold">
          {productTitle}
        </p>
        <div className="text-shade text-xs flex items-center gap-4">
          <p>Quantity: {quantity}</p>
          <p>Variant: {variantName}</p>
        </div>
        <div className="text-shade max-sm:hidden text-sm flex items-center gap-4">
          <button className="flex items-center gap-1">
            <HeartSvg width={18} /> Save for later
          </button>
          <button
            className="border-l flex items-center gap-1"
            onClick={removeItem}
          >
            <DeleteSvg /> Remove
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 pl-5 max-sm:pl-1">
      <p className="text-xl max-[500px]:text-base font-bold">
  <span>₹{(product?.sellingPrice * quantity).toFixed(2)}</span>{" "}
  <s className="text-shade pl-1">₹{(product?.mrp * quantity).toFixed(2)}</s>
</p>

        <QuantityButtons
          wrapperClass="bg-white border text-base"
          decreaseHandler={decreaseHandler}
          increaseHandler={increaseHandler}
          quantity={quantity}
        />
      </div>
      <div className="max-sm:flex hidden justify-between text-shade items-center col-span-3 pl-5">
        <button className="flex items-center gap-1 w-1/2 justify-center">
          <HeartSvg width={18} /> Save for later
        </button>
        <button
          className="border-l-2 flex items-center gap-1 w-1/2 justify-center"
          onClick={removeItem}
        >
          <DeleteSvg /> Remove
        </button>
      </div>
    </div>
  );
}
