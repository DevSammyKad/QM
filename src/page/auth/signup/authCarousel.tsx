"use client";

import React from "react";
import "./custom.css";
import useEmblaCarousel from "embla-carousel-react";
import ImageCarouselCard from "@/src/components/custom-cards/image-carousel-card";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
export default function AuthCarousel({
  carouselData,
}: {
  carouselData: {
    url: string;
    title: string;
    desc: string;
  }[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ playOnInit: true, delay: 2500 }),
  ]);
  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {carouselData.map((data) => (
            <div className="embla__slide" key={data.url}>
              <ImageCarouselCard data={data} />
            </div>
          ))}
        </div>
      </div>{" "}
    </section>
  );
}
