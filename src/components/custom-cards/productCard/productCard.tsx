"use client";
/* eslint-disable @next/next/no-img-element */
import { Routes } from "@/routes.config";
import HeartSvg from "@/src/icons/heartSvg";
import RedHeartSvg from "@/src/icons/redHeartSvg";
import { ProductCardType } from "@/src/types";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import IconButton from "@/src/ui/buttons/iconButton";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import Api from "@/src/page/utils/Api";
import { header } from "@/src/page/utils/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CardType = {
  data: ProductCardType;
  forCarousel?: boolean;
};

export default function ProductCard({ data, forCarousel = false }: CardType) {
  const {
    actualPrice,
    imgUrl,
    sellingPrice,
    title,
    productName,
    // isLiked,
    offer = 70,
  } = data;

  // State to handle image loading error
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false); // To track if the item is being added to the cart
  const [error, setError] = useState(""); // For error handling
  const defaultImageUrl = "placeholder.png";
  // Initialize isLiked from localStorage or use the default value from props
  const [isLiked, setIsLiked] = useState(() => {
    const savedIsLiked = localStorage.getItem(`isLiked_${data.id}`);
    return savedIsLiked === "true" || data.isLiked || false; // Check if it's already saved in localStorage
  });

  // Fallback function for handling image load errors
  const handleImageError = () => {
    setImageError(true);
  };

  const router = useRouter();
  const handleCardKlik = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(Routes.medicines + "/" + encodeURIComponent(title));
  };

  // Add to Cart function
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    setError(""); // Reset the error state before trying to add
    try {
      const userId = 4; // Replace with actual user ID from authentication context/session
      if (!userId || !data.id) {
        setError("User ID or Product ID is missing.");
        return;
      }

      const productId = data.id;
      if (!productId) {
        setError("Product ID is missing.");
        return;
      }

      const response = await fetch(Api.AddToCart, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          userId: userId, // Add userId to the request body
          productId: productId,
          quantity: 1, // Assume 1 quantity for simplicity; you can modify this based on your app's requirements
        }),
      });

      const result = await response.json();

      // Check if response status is successful
      if (response.ok && result.status === true) {
        // alert(result.message); // Display success message (or handle it in your UI)
        toast.success(result.message || "Item Added To Cart"); // Show success toast

        return; // Success, exit the function
      }

      // Handle errors if response status is not success
      setError(result.message || "Failed to add item to cart"); // Update error state
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError("An error occurred while adding to cart.");
    } finally {
      setIsAddingToCart(false); // Reset loading state
    }
  };

  // Function to toggle the product in the wishlist
  const handleWishlistToggle = async () => {
    try {
      const productId = data.id;
      if (!productId) {
        setError("Product ID is missing.");
        return;
      }

      const response = await fetch(Api.WishlistToggle, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          productId: productId,
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === true) {
        setIsLiked(!isLiked); // Toggle the wishlist state
        localStorage.setItem(`isLiked_${productId}`, (!isLiked).toString()); // Save the new isLiked value in localStorage
        // alert(result.message); // Display success message (or handle it in your UI)
        toast.success(result.message || "Product added to Whishlist"); // Show success toast
      } else {
        setError(result.message || "Failed to toggle wishlist");
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      setError("An error occurred while toggling the wishlist.");
    }
  };

  return (
    <div
      onClick={handleCardKlik}
      className={`border bg-white  cursor-pointer  ${
        forCarousel ? "min-w-[220px]" : "w-full"
      }  relative shadow-product-card px-3 rounded-3xl py-4`}
    >
      <div className="bg-[#F26522] overflow-visible text-[10px] font-bold text-white absolute top-[15px] left-[-8px]  p-1  rounded-tl-md rounded-[2px]">
        <div className="relative w-full h-full leading-none pl-1 pr-2">
          {offer}% off
        </div>
        <svg
          width="9"
          height="8"
          viewBox="0 0 9 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-full -translate-y-[53%] left-0"
        >
          <path
            d="M8.02609 0.777504V7.25979C4.33618 7.25979 1.41915 4.84971 0.421875 3.64467C3.01479 0.752572 6.57173 0.528185 8.02609 0.777504Z"
            fill="#F26522"
          />
        </svg>
        <div
          style={{
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 10px 10px 0",
            borderColor: "transparent white transparent transparent",
          }}
          className=" absolute top-[-1px] right-[0px]"
        ></div>
        <div
          style={{
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: " 0  0 10px 10px",
            borderColor: "transparent transparent  white transparent",
          }}
          className=" absolute bottom-[-1px] border border-white right-[0px]"
        ></div>
      </div>
      <IconButton onClick={handleWishlistToggle}>
        {isLiked ? <RedHeartSvg /> : <HeartSvg />}
      </IconButton>
      <div className="flex items-center justify-center">
        <img
          src={imageError ? defaultImageUrl : imgUrl}
          alt="product"
          className="object-cover object-top w-auto h-[140px]"
          onError={handleImageError}
        />
      </div>
      <div className="flex flex-col gap-3 pt-3">
        <h2 className="line-clamp-2 font-semibold text-sm leading-5">
          {title || productName}
        </h2>
        <p className="font-extrabold text-lg ">
          <span>₹{sellingPrice}</span>
          <s className="pl-1 opacity-60">₹{actualPrice}</s>
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
        {/* Display error message */}
        <PrimaryButton
          onClick={handleAddToCart}
          disabled={isAddingToCart} // Disable the button while adding to cart
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </PrimaryButton>
      </div>
    </div>
  );
}
