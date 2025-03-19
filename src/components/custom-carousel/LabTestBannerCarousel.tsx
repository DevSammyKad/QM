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
      image:
        'https://s3-alpha-sig.figma.com/img/ea24/bd3d/5a6c88372e0df6911f9521584641f90d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=X3~jmYsz2piFSu5V8L2bevDeu2xUbftBGJIob53llo-gOTC771IeAziXRUGo2C9k~R-XiM2~5NpEmnKle3-8rUjwqIyq58IZ~Q69AlRlJMb0RWWColDuVI~oE7HHPhG~ISQyUHClAjSxdFxTQSWNC~a93C8TBb1BpBqqoXyZFtQj6Ovgt42s5BjF0sJbfYPsujw8re~nSaMB3XlOqwLspnINuQnqj30mlWfNlCqicTpPVB9F5-r0iau2VJuhiJH8xifpKkf7RalT65QJBLmsdwjJ2zMR9~z9~nxlz~2qULP4liGQbI8DxMHeRv~FyMJ0ECmPFHk95M-TpEZqchNvpw__', // Replace with actual path
      link: '/popular-lab-test',
    },
    {
      id: 'sample-collection',
      image: '/LabTestBanner1.png', // Replace with actual path
      link: '/popular-lab-test',
    },
    {
      id: 'chest-pain',
      image: '/LabTestBanner2.png', // Replace with actual path
      link: '/popular-lab-test',
    },
    {
      id: 'diabetes',
      image: '/LabTestBanner1.png', // Replace with actual path
      link: '/popular-lab-test',
    },
    {
      id: 'thyroid',
      image: '/LabTestBanner2.png', // Replace with actual path
      link: '/popular-lab-test',
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
                    className="w-full h-auto object-cover aspect-3/2"
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
