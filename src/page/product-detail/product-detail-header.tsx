"use client";

import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import ProductVariantCard from "@/src/components/custom-cards/product-variant-card";
import EmblaCarousel from "@/src/components/product-carausal/EmblaCarousal";
import HeartSvg from "@/src/icons/heartSvg";
import ShareSvg from "@/src/icons/shareSvg";
import RedHeartSvg from "@/src/icons/redHeartSvg";
import { ProductDetailsType, ProductVariantType } from "@/src/types/productTypes";
import { toast } from "react-toastify"; // Added toast import
import "react-toastify/dist/ReactToastify.css"; // Added CSS import for toast

type Props = {
  productData: ProductDetailsType; // Product data comes from props
  selectedVariant: ProductVariantType;
  setSelectedVariant: Dispatch<SetStateAction<ProductVariantType>>;
};

export default function ProductDetailsHeader({
  productData,
  selectedVariant,
  setSelectedVariant,
}: Props) {
  // Return early if no product data is provided
  if (!productData) {
    return <p className="text-red-500">No product data available</p>;
  }

  // State for wishlist (is the product liked) and error handling
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState<string>("");

  // Check the initial wishlist status when component mounts
  useEffect(() => {
    const productId = productData?.id;
    const savedStatus = localStorage.getItem(`wishlist_${productId}`);
    if (savedStatus) {
      setIsLiked(JSON.parse(savedStatus));
    }
  }, [productData?.id]);

  // Handle wishlist toggle (add/remove product)
  const handleWishlistToggle = async () => {
    try {
      const productId = productData?.id;
      if (!productId) {
        setError("Product ID is missing.");
        toast.error("Product ID is missing.");
        return;
      }

      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Authentication token not found.");
        toast.error("Please log in to modify your wishlist.");
        return;
      }

      const response = await fetch(
        "https://quickmeds.sndktech.online/wishlist.toggle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          },
          body: JSON.stringify({ productId }),
        }
      );

      const result = await response.json();

      if (response.ok && result.status === true) {
        setIsLiked(!isLiked); // Toggle the liked status
        localStorage.setItem(`wishlist_${productId}`, (!isLiked).toString()); // Store new status in localStorage
        toast.success(result.message || `Product ${isLiked ? "removed from" : "added to"} Wishlist`);
      } else {
        setError(result.message || "Failed to toggle wishlist");
        toast.error(result.message || "Failed to toggle wishlist");
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      setError("An error occurred while toggling the wishlist.");
      toast.error("An error occurred while toggling the wishlist.");
    }
  };

  // Handle the share functionality
  const handleShare = () => {
    const currentUrl = window.location.href; // Get the current URL
    if (navigator.share) {
      // If the Web Share API is available (on mobile or supported browsers)
      navigator
        .share({
          title: productData.productName,
          url: currentUrl,
        })
        .then(() => {
          toast.success("Link shared successfully");
        })
        .catch((err) => {
          console.error("Error sharing:", err);
          toast.error("Failed to share the link.");
        });
    } else {
      // If the Web Share API is not available, copy the URL to clipboard
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Error copying link:", err);
          toast.error("Failed to copy the link.");
        });
    }
  };

  return (
    <div className="grid grid-cols-6 max-lg:grid-cols-3 max-lg:gap-5 max-lg:grid-rows-[auto] max-lg:items-center max-lg:justify-items-center">
      <div className="w-full col-span-3 relative">
        <div className="absolute top-1 right-5 z-10 flex flex-col max-xl:flex-row gap-3">
          <button className="flex items-center gap-1" onClick={handleWishlistToggle}>
            {isLiked ? (
              <RedHeartSvg width={20} /> // Display red heart when liked
            ) : (
              <HeartSvg width={20} /> // Display regular heart when not liked
            )}
            <span>{isLiked ? "" : ""}</span>
          </button>
          <button className="flex items-center gap-1" onClick={handleShare}>
            <ShareSvg width={18} /> {/* The share icon */}
            <span></span>
          </button>
        </div>
        <EmblaCarousel images={productData.images} />
      </div>
      <div className="col-span-3 flex flex-col gap-3 pr-3">
        <h1 className="text-2xl max-sm:text-xl font-medium leading-8">
          {productData.productName}
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-shade text-sm">Select Variants</p>
          <div className="grid grid-cols-3 max-[450px]:grid-cols-2 max-[300px]:grid-cols-1 max-sm:px-1 gap-4">
            {productData.variants.map((variant) => (
              <ProductVariantCard
                selected={selectedVariant.id === variant.id}
                setSelectedVariant={setSelectedVariant}
                variant={variant}
                key={variant.id} // Using `id` instead of `units`
              />
            ))}
          </div>
          <div className="grid grid-cols-2 max-[350px]:grid-cols-1 gap-4 py-4">
            <div className="flex flex-col">
              <p className="font-medium leading-none">Manufacturer/Marketer</p>
              <span className="text-lg font-medium text-shade">
                {productData.manufacturer}
              </span>
            </div>
            <div className="flex flex-col">
              <p className="font-medium leading-none">Return Policy</p>
              <span className="text-lg font-medium text-shade">
                {productData.return_policy || "No Return Policy"}
              </span>
            </div>
            <div className="flex flex-col">
              <p className="font-medium leading-none">Consume Type</p>
              <span className="text-lg font-medium text-shade">
                {productData.consumeType}
              </span>
            </div>
            <div className="flex flex-col">
              <p className="font-medium leading-none">Expires on or after</p>
              <span className="text-lg font-medium text-shade">
                {productData.expireDate || "No Expiry Date"}
              </span>
            </div>
          </div>
        </div>
        {/* Display error message if it exists */}
        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
      </div>
    </div>
  );
}