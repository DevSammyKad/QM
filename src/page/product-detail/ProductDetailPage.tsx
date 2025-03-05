'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '@/src/components/custom-cards/productCard/productCard';
import Carousel from '@/src/components/custom-carousel/carousel';
import CarouselTitleBox from '@/src/components/custom-carousel/carousel-title-box';
import ProductDetailsHeader from '@/src/page/product-detail/product-detail-header';
import ProductInformation from '@/src/page/product-detail/product-information';
import Ratings from '@/src/page/product-detail/ratings';
import Reviews from '@/src/page/product-detail/reviews';
import {
  ProductCardType,
  ProductDetailsType,
  ProductVariantType,
} from '@/src/types/productTypes';
import BuyButton from './buy-button';
import NotifyButton from './notify-button';
import ExpertAdvice from './ExpertAdvice';
import { Divider } from '@nextui-org/react';
import Refill from './refill';

export default function ProductDetailPage() {
  const [productData, setProductData] = useState<ProductDetailsType | null>(
    null
  );
  const [productsCardData, setProductsCardData] = useState<ProductCardType[]>(
    []
  );
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariantType | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          'https://quickmeds.sndktech.online/product.get/17',
          {
            headers: {
              'X-Authorization':
                'RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph',
            },
          }
        );

        const data = response.data?.product || {}; // Ensure `product` exists
        setProductData(data);
        setProductsCardData(data.substituteProducts || []);
        setSelectedVariant(data.variants?.[0] || null); // Set first variant by default
      } catch (error) {
        console.error('Error fetching product data:', error);
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

          {/* Pass the product info to ProductInformation */}
          <ProductInformation
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

          <p className="my-5 text-gray-500">
            Disclaimer The information provided herein is supplied to the best
            of our abilities to make it accurate and reliable as it is published
            after a review by a team of professionals. This information is
            solely intended to provide a general overview on the product and
            must be used for informational purposes only. You should not use the
            information provided herein to diagnose, prevent, or cure a health
            problem. Nothing contained on this page is intended to create a
            doctor-patient relationship, replace or be a substitute for a
            registered medical practitioner's medical treatment/advice or
            consultation. The absence of any information or warning to any
            medicine shall not be considered and assumed as an implied
            assurance. We highly recommend that you consult your registered
            medical practitioner for all queries or doubts related to your
            medical condition. You hereby agree that you shall not make any
            health or medical-related decision based in whole or in part on
            anything contained in the Site. Please click here for detailed T&C.{' '}
          </p>

          <Divider />
          <p className="text-gray-500">
            All the Products are packed and stored Safely as per the
            instructions from the manufacturer
          </p>
        </div>
      </div>

      <div className="w-1/4 max-lg:fixed max-lg:bottom-0 max-lg:z-[9999999] max-lg:left-0 max-lg:w-full max-lg:bg-white max-lg:py-2 max-lg:px-3 max-lg:border-t max-lg:shadow-lg flex flex-col gap-2">
        {/* Show BuyButton if the selected variant is in stock, otherwise show NotifyButton */}
        {selectedVariant?.stock === 'Available' ? (
          <BuyButton variantData={selectedVariant} />
        ) : (
          <NotifyButton />
        )}
        <ExpertAdvice />
        <Refill />
      </div>
    </div>
  );
}
