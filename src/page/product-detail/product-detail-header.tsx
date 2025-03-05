"use client";
import ProductVariantCard from "@/src/components/custom-cards/product-variant-card";
import EmblaCarousel from "@/src/components/product-carausal/EmblaCarousal";
import HeartSvg from "@/src/icons/heartSvg";
import ShareSvg from "@/src/icons/shareSvg";
import {
  ProductDetailsType,
  ProductVariantType,
} from "@/src/types/productTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import ProductInformation from "./ProductInformation";
// import ProductInformation from "./product-information"

type Props = {
  id: string; // Accept productId as a prop
  selectedVariant: ProductVariantType;
  setSelectedVariant: Dispatch<SetStateAction<ProductVariantType>>;
};

export default function ProductDetailsHeader({
  id,
  setSelectedVariant,
  selectedVariant,
}: Props) {
  // State to hold product data
  const [productData, setProductData] = useState<ProductDetailsType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true); // To show loading state
  const [error, setError] = useState<string>(""); // To capture any error messages

  // Fetch product data from API when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log("Fetching product with ID:", id); // Log the productId
        const response = await fetch(
          `https://quickmeds.sndktech.online/product.get/17`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Authorization token
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2NzQ1Mzg1LCJleHAiOjE3NDgzMDI5ODV9.5wRlYbaliLtMW57h7YCASiJZsESXS1Ouo6i48zuIyTI",
            },
          }
        );
        const result = await response.json();
        console.log(result);
        if (response.ok && result.status === true) {
          setProductData(result.product); // Set fetched product data in state
        } else {
          setError(result.message || "Failed to fetch product details");
        }
      } catch (err) {
        setError("An error occurred while fetching product data");
        console.error(err);
      } finally {
        setLoading(false); // Stop loading after the request is finished
      }
    };

    fetchProductDetails();
  }, [id]); // Re-run the effect when productId changes

  if (loading) {
    return <p>Loading...</p>; // Show loading text while fetching
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Show error message if there's an issue
  }

  if (!productData) {
    return <p>No product data available</p>; // If there's no product data
  }

  // Access the variants from the product data
  const variants = productData.variants;

  return (
    <div className="grid grid-cols-6 max-lg:grid-cols-3 max-lg:gap-5 max-lg:grid-rows-[auto] max-lg:items-center max-lg:justify-items-center ">
      <div className=" w-full col-span-3 relative">
        <div className="absolute top-1 right-5 z-10 flex flex-col max-xl:flex-row gap-3">
          <HeartSvg width={28} height={28} className="cursor-pointer" />
          <ShareSvg />
        </div>
        <EmblaCarousel images={productData.images} />
      </div>
      <div className=" col-span-3 flex flex-col gap-3 pr-3">
        <h1 className="text-2xl max-sm:text-xl font-medium leading-8">
          {productData.productName}
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-shade text-sm">Select Variants</p>
          <div className="grid  grid-cols-3 max-[450px]:grid-cols-2 max-[300px]:grid-cols-1 max-sm:px-1 gap-4">
            {variants.map((variant) => (
              <ProductVariantCard
                selected={selectedVariant.id === variant.id}
                setSelectedVariant={setSelectedVariant}
                variant={variant}
                key={variant.units}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 max-[350px]:grid-cols-1 gap-4 py-4">
            <div className="flex  flex-col">
              <p className=" font-medium leading-none">Manufacturer/Marketer</p>
              <span className="text-lg font-medium text-shade">
                {productData.manufacturer}
              </span>
            </div>
            <div className="flex  flex-col">
              <p className=" font-medium leading-none">Return Policy </p>
              <span className="text-lg font-medium text-shade">
                {productData.return_policy || "No Return Policy"}
              </span>
            </div>
            <div className="flex  flex-col">
              <p className=" font-medium leading-none">Consume Type</p>
              <span className="text-lg font-medium text-shade">
                {productData.consumeType}
              </span>
            </div>
            <div className="flex  flex-col">
              <p className=" font-medium leading-none">Expires on or after</p>
              <span className="text-lg font-medium text-shade">
                {productData.expireDate || "No Expiry Date"}
              </span>
            </div>
          </div>
        </div>
        {/* Move ProductInformation here */}
        {/* <ProductInformation productData={productData} /> Pass product data here */}
      </div>
    </div>
  );
}
