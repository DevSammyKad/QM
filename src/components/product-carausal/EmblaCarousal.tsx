/* eslint-disable @next/next/no-img-element */
"use client";
import ArrowIcon from "@/src/icons/arrowIcon";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import React, { useCallback, useEffect, useState } from "react";
import { Thumb } from "./EmblaCarouselThumb";
import "./embla.css";

type PropType = {
  images: { url: string; id: number }[];
  options?: EmblaOptionsType;
};

const defaultOptions: EmblaOptionsType = {
  axis: "y",
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { images, options = defaultOptions } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(
    {
      axis: "y",
      dragFree: true,
    },
    [WheelGesturesPlugin()]
  );

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const scrollPrev = () => {
    if (emblaThumbsApi && emblaMainApi) {
      emblaThumbsApi.scrollPrev();
      emblaMainApi.scrollPrev(true);
    }
  };

  const scrollNext = () => {
    if (emblaThumbsApi && emblaMainApi) {
      emblaThumbsApi.scrollNext();
      emblaMainApi.scrollNext(true);
    }
  };

  return (
    <div className="embla  flex flex-row-reverse ">
      <div className="embla__viewport " ref={emblaMainRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div className="embla__slide" key={image.id}>
              <div className="embla__slide__number">
                <img
                  src={image.url}
                  alt={"image"}
                  className="h-[375px] w-[250px] object-contain "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="embla-thumbs ">
        <div
          onClick={scrollPrev}
          className="flex cursor-pointer pb-2 mb-2 items-center justify-center "
        >
          <ArrowIcon className="rotate-180" />
        </div>
        <div className="embla-thumbs__viewport " ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {images.map((image, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(image.id)}
                selected={image.id === selectedIndex}
                image={image}
              />
            ))}
          </div>
        </div>
        <div
          className="flex cursor-pointer pt-2 mt-2 items-center justify-center "
          onClick={scrollNext}
        >
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
