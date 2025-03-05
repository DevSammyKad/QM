"use client";
import ImageCarouselCard from "@/src/components/custom-cards/image-carousel-card";
import Carousel from "@/src/components/custom-carousel/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import AuthCarousel from "./signup/authCarousel";

export default function AuthSidePanel() {
  return (
    <div className="w-1/2 p-12 flex items-center justify-center">
      {/* <Carousel
        plugins={[Fade(), Autoplay({ playOnInit: true, delay: 2500 })]}
        options={{ loop: true }}
        slideDataLength={carouselData.length}
        renderProp={() => {
          return carouselData.map((data) => (
            <ImageCarouselCard key={data.url} data={data} />
          ));
        }}
      /> */}
      <AuthCarousel carouselData={carouselData} />
    </div>
  );
}

const carouselData = [
  {
    url: "/media/login/loginslide.png",
    title: "Your go-to health app",
    desc: "Your complete healthcare companion in your pocket",
  },
  {
    url: "/media/login/loginslideb.png",
    title: "Home delivery of medicines",
    desc: "order any medicine or health product at discounted prices and get them delivered at your doorstep",
  },
  {
    url: "/media/login/loginslidec.png",
    title: "Lab tests at home",
    desc: "Book any test from any lab. we’ll collect the sample and send the reports. Save upto 80% every time",
  },
];
