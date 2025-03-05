"use client";

import ProductCard from "@/src/components/custom-cards/productCard/productCard";
import Carousel from "@/src/components/custom-carousel/carousel";
import { ProductCardType } from "@/src/types";
import { Divider } from "@nextui-org/react";

type Props = {
  randomData: ProductCardType[];
};

export default function CartSuggested({ randomData }: Props) {
  return (
    <div className=" py-3 max-lg:hidden flex flex-col gap-2">
      <Divider className="h-1  " />
      <p className="text-shade pt-5 text-2xl font-semibold">
        You may also like
      </p>
      <Carousel
        renderProp={() => {
          return randomData.map((data) => (
            <ProductCard forCarousel key={data.id} data={data} />
          ));
        }}
        slideDataLength={randomData.length}
      />
    </div>
  );
}
