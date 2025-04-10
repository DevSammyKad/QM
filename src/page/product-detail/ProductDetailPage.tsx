"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/src/components/custom-cards/productCard/productCard";
import Carousel from "@/src/components/custom-carousel/carousel";
import CarouselTitleBox from "@/src/components/custom-carousel/carousel-title-box";
import ProductDetailsHeader from "@/src/page/product-detail/product-detail-header";
import ProductInformation from "@/src/page/product-detail/product-information";
import Ratings from "@/src/page/product-detail/ratings";
import Reviews from "@/src/page/product-detail/reviews";
import {
  ProductCardType,
  ProductDetailsType,
  ProductVariantType,
} from "@/src/types/productTypes";
import BuyButton from "./buy-button";
import NotifyButton from "./notify-button";
import ExpertAdvice from "./ExpertAdvice";
import Refill from "./refill";

export default function ProductDetailPage() {
  const [productData, setProductData] = useState<ProductDetailsType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productsCardData, setProductsCardData] = useState<ProductCardType[]>(
    []
  );
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariantType | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const selectedProductId = localStorage.getItem("selectedProductId");
        if (!selectedProductId) {
          setError("No selected product ID found in localStorage.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://quickmeds.sndktech.online/product.get/${selectedProductId}`,
          {
            headers: {
              "X-Authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            },
          }
        );

        const data = response.data?.product || {}; // Ensure `product` exists
        setProductData(data);
        setProductsCardData(data.substituteProducts || []);
        setSelectedVariant(data.variants?.[0] || null); // Set first variant by default
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  if (!productData) {
    return <div>Loading...</div>;
  }

  // Ensure ratings and reviews data is valid
  const ratingData = productData?.averageRating || 0;
  const reviewData = productData?.reviews || [];

  return (
    <div className="w-full h-full overflow-y-scroll flex items-start">
      <div className="w-3/4 max-lg:w-full flex flex-col gap-20 max-lg:gap-10 max-sm:gap-7">
        {/* Pass the relevant data to the components */}
        <ProductDetailsHeader
          productData={productData}
          setSelectedVariant={setSelectedVariant}
          selectedVariant={selectedVariant}
        />

        <div className="w-full flex flex-col gap-10">
          <CarouselTitleBox title="Substitute products">
            <Carousel
              renderProp={() =>
                productsCardData.map((data) => (
                  <ProductCard forCarousel key={data.id} data={data} />
                ))
              }
              slideDataLength={productsCardData.length}
            />
          </CarouselTitleBox>

          {/* ✅ Product Information Component with Props */}
          <ProductInformation
            productId={productData.id}
            productIntroduction={productData.productIntroduction}
            composition={productData.composition}
            uses={productData.usesOfMedication}
            benefits={productData.benefits}
            contradictions={productData.contradictions}
            isPrescriptionRequired={productData.isPrescriptionRequired}
          />

          {/* Pass rating and review data */}
          <Ratings ratings={ratingData} totalReviews={reviewData.length} />

          {/* Pass the reviews data */}
          <Reviews reviewsData={reviewData} />

          <CarouselTitleBox title="You may also like">
            <Carousel
              renderProp={() =>
                productsCardData.map((data) => (
                  <ProductCard forCarousel key={data.id} data={data} />
                ))
              }
              slideDataLength={productsCardData.length}
            />
          </CarouselTitleBox>
        </div>
      </div>

      <div className="w-1/4 max-lg:fixed max-lg:bottom-0 max-lg:z-[9999999] max-lg:left-0 max-lg:w-full max-lg:bg-white max-lg:py-2 max-lg:px-3 max-lg:border-t max-lg:shadow-lg flex flex-col gap-2">
        {/* Show BuyButton if the selected variant is in stock, otherwise show NotifyButton */}
        {selectedVariant?.stock === "Available" ? (
          <BuyButton variantData={selectedVariant} />
        ) : (
          <NotifyButton />
        )}
        <ExpertAdvice expertAdvice={productData?.expertAdvice || null} />
        <Refill />
      </div>
    </div>
  );
}
