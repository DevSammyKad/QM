"use client";
import { useEffect, useState } from "react";
import BannerCard from "@/src/components/custom-cards/bannerCard";
import Carousel from "@/src/components/custom-carousel/carousel";
import SiteLayout from "@/src/layouts/site-layout";
import { EmblaOptionsType } from "embla-carousel";
import Api from "../utils/Api";
import { header } from "../utils/Api";

const OPTIONS: EmblaOptionsType = { align: "start", dragFree: true };
// const bannerData = [
//   "/media/bannerimgs/banner1.png",
//   "/media/bannerimgs/banner2.png",
//   "/media/bannerimgs/banner1.png",
//   "/media/bannerimgs/banner2.png",
//   "/media/bannerimgs/banner1.png",
//   "/media/bannerimgs/banner2.png",
// ];
export default function Banners() {
  const [bannerData, setBannerData] = useState<string[][]>([]); // State to hold banner images
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the banner list from the API
    const fetchBannerData = async () => {
      try {
        const res = await fetch(Api.Banner, {
          headers: header,
        });
        const data = await res.json();

        if (data.status) {
          // Assuming the API returns image arrays for image1, image2, image3
          setBannerData([
            data.image1 || [],
            data.image2 || [],
            data.image3 || [],
          ]);
        } else {
          setError("Failed to fetch banners.");
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  if (loading) {
    return <div>Loading banners...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <SiteLayout className="p-0">
      <Carousel
        slideDataLength={bannerData.length}
        renderProp={() => {
          return bannerData.map((images, index) => (
            <BannerCard key={index} data={images} />
          ));
        }}
        options={OPTIONS}
      />
    </SiteLayout>
  );
}
