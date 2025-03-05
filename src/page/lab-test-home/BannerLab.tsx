"use client";
import BannerCard from "@/src/components/custom-cards/bannerCard";
import Carousel from "@/src/components/custom-carousel/carousel";
import SiteLayout from "@/src/layouts/site-layout";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { align: "start", dragFree: true };

export default function BannersLab({ bannerData }: { bannerData: string[] }) {
  return (
    <SiteLayout className="p-0">
      <Carousel
        slideDataLength={bannerData.length}
        renderProp={() => {
          return bannerData.map((banner, index) => (
            <BannerCard key={index} data={banner} />
          ));
        }}
        options={OPTIONS}
      />
    </SiteLayout>
  );
}
