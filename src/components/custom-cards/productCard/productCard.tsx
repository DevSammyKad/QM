"use client";
/* eslint-disable @next/next/no-img-element */
import { Routes } from "@/routes.config";
import HeartSvg from "@/src/icons/heartSvg";
import RedHeartSvg from "@/src/icons/redHeartSvg";
import { ProductCardType } from "@/src/types";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import IconButton from "@/src/ui/buttons/iconButton";
import { useRouter } from "next/navigation";
import { MouseEvent, useState, useCallback } from "react";
import Api from "@/src/page/utils/Api";
import { header } from "@/src/page/utils/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CardType = {
  data: ProductCardType;
  forCarousel?: boolean;
  onClick?: (productId: number) => void;
};

export default function ProductCard({
  data,
  forCarousel = false,
  onClick,
}: CardType) {
  const {
    actualPrice,
    imgUrl,
    sellingPrice,
    title,
    productName,
    id,
    offer = 70,
    isLiked: initialIsLiked = false,
  } = data;

  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(() => {
    try {
      const savedIsLiked = localStorage.getItem(`isLiked_${id}`);
      return savedIsLiked === null ? initialIsLiked : savedIsLiked === "true";
    } catch {
      return initialIsLiked;
    }
  });

  const defaultImageUrl = "placeholder.png";
  const router = useRouter();

  const handleImageError = useCallback(() => setImageError(true), []);

  const handleCardClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      // Store the single product ID, overwriting any previous value
      localStorage.setItem("selectedProductId", id.toString());
      if (onClick) onClick(id);
      router.push(
        `${Routes.medicines}/${encodeURIComponent(title || productName)}`
      );
    },
    [id, title, productName, router, onClick]
  );

  const handleAddToCart = useCallback(async () => {
    setIsAddingToCart(true);
    setError("");
    try {
      const authToken = localStorage.getItem("authToken");
      const storedUserId = localStorage.getItem("userId");

      if (!storedUserId || !id) {
        throw new Error("User ID or Product ID is missing.");
      }
      if (!authToken) {
        throw new Error("Authentication token is missing. Please log in.");
      }

      const response = await fetch(Api.AddToCart, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          userId: storedUserId,
          productId: id,
          quantity: 1,
        }),
      });

      const result = await response.json();
      if (!response.ok || result.status !== true) {
        throw new Error(result.message || "Failed to add item to cart");
      }

      toast.success(result.message || "Item added to cart");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsAddingToCart(false);
    }
  }, [id]);

  const handleWishlistToggle = useCallback(async () => {
    try {
      const response = await fetch(Api.WishlistToggle, {
        method: "POST",
        headers: header,
        body: JSON.stringify({ productId: id }),
      });
  
      const result = await response.json();
      if (!response.ok || result.status !== true) {
        throw new Error(result.message || "Failed to toggle wishlist");
      }
  
      setIsLiked((prev) => {
        const newIsLiked = !prev;
        try {
          localStorage.setItem(`isLiked_${id}`, newIsLiked.toString());
        } catch {
          console.warn("Failed to update localStorage for wishlist");
        }
  
        // Show the correct message based on the new state
        // toast.success(
        //   newIsLiked ? "Product added to wishlist" : "Product removed from wishlist"
        // );
  
        return newIsLiked;
      });
  
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, [id]);
  

  return (
    <div
      onClick={handleCardClick}
      className={`border bg-white cursor-pointer ${
        forCarousel ? "min-w-[220px]" : "w-full"
      } relative shadow-product-card px-3 rounded-3xl py-4`}
    >
      {/* Rest of the component remains unchanged */}
      <div className="bg-[#F26522] text-[10px] font-bold text-white absolute top-[15px] left-[-8px] p-1 rounded-tl-md rounded-[2px]">
        <div className="relative pl-1 pr-2 leading-none">
          {offer}% off
          <svg
            width="9"
            height="8"
            viewBox="0 0 9 8"
            fill="none"
            className="absolute top-full -translate-y-[53%] left-0"
          >
            <path
              d="M8.02609 0.777504V7.25979C4.33618 7.25979 1.41915 4.84971 0.421875 3.64467C3.01479 0.752572 6.57173 0.528185 8.02609 0.777504Z"
              fill="#F26522"
            />
          </svg>
        </div>
      </div>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleWishlistToggle();
        }}
      >
        {isLiked ? <RedHeartSvg /> : <HeartSvg />}
      </IconButton>
      <div className="flex items-center justify-center">
        <img
          src={imageError ? defaultImageUrl : imgUrl}
          alt={title || productName || "product"}
          className="object-cover object-top w-auto h-[140px]"
          onError={handleImageError}
        />
      </div>
      <div className="flex flex-col gap-3 pt-3">
        <h2 className="line-clamp-2 font-semibold text-sm leading-5">
          {title || productName}
        </h2>
        <p className="font-extrabold text-lg">
          <span>₹{sellingPrice}</span>
          <s className="pl-1 opacity-60">₹{actualPrice}</s>
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <PrimaryButton
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </PrimaryButton>
      </div>
    </div>
  );
}
