"use client";
import BannerCard from "@/src/components/custom-cards/bannerCard";
import Carousel from "@/src/components/custom-carousel/carousel";
import SiteLayout from "@/src/layouts/site-layout";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { align: "start", dragFree: true };
const bannerData = [
  "/media/bannerimgs/banner1.png",
  "/media/bannerimgs/banner2.png",
  "/media/bannerimgs/banner1.png",
  "/media/bannerimgs/banner2.png",
  "/media/bannerimgs/banner1.png",
  "/media/bannerimgs/banner2.png",
];
export default function Banners() {
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
