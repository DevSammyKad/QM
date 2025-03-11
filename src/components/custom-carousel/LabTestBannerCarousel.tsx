import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const LabTestBannerCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1200px)': { slidesToScroll: 3 },
    },
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const banners = [
    {
      id: 'vein-finder',
      image: '/lab-test-1.jpg', // Replace with actual path
      link: '/book/vein-finder',
    },
    {
      id: 'sample-collection',
      image: '/lab-test-2.jpg', // Replace with actual path
      link: '/book/sample-collection',
    },
    {
      id: 'chest-pain',
      image: '/lab-test-3.jpg', // Replace with actual path
      link: '/book/troponin-test',
    },
    {
      id: 'diabetes',
      image: '/lab-test-4.jpg', // Replace with actual path
      link: '/book/diabetes',
    },
    {
      id: 'thyroid',
      image: '/lab-test-5.jpg', // Replace with actual path
      link: '/book/thyroid',
    },
  ];

  return (
    <div className="relative w-full my-8 px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-4 first:pl-0 pr-4"
            >
              <Link href={banner.link}>
                <div className="relative rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-[1.02]">
                  <img
                    src={banner.image}
                    alt="Lab test banner"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Navigation Buttons */}
      <button
        className="absolute top-1/2 left-0 -translate-y-1/2 p-2 rounded-md h-20 w-10 shadow-lg z-10 text-white hover:bg-blue-600 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed  bg-blue-300"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-md h-20 w-10 shadow-lg z-10 text-white hover:bg-blue-600 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed  bg-blue-300"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default LabTestBannerCarousel;
