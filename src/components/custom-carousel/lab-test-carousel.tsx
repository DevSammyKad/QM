'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight } from 'lucide-react';
import ImgTab from '../imgTab/img-tab';
import { useRouter } from 'next/navigation';

const defaultImageUrl = '/LabTestDummy.png';

interface TestCardProps {
  icon: string;
  title: string;
  testCount: number;
  price: number;
  onSchedule: () => void;
}

const TestCard = ({
  icon,
  title,
  testCount,
  price,
  onSchedule,
}: TestCardProps) => {
  return (
    <div className="flex p-4 rounded-xl border border-gray-200 bg-white shadow-sm h-full">
      <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mr-4">
        <ImgTab
          src={icon || '/LabTestDummy.png'}
          alt={title}
          width={40}
          height={40}
          className="object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImageUrl;
          }}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500">Contains {testCount} tests</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-base font-semibold">₹{price}</span>
            <span className="text-xs text-gray-500 ml-1">onwards</span>
          </div>
          <button
            onClick={onSchedule}
            className="flex items-center text-orange-500 hover:text-orange-600 transition-colors text-sm"
          >
            Schedule now
            <ChevronRight className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabTestCarouselProps {
  title: string;
  description?: string;
  viewAllLink?: string;
  tests: {
    id: string;
    icon: string;
    title: string;
    testCount: number;
    price: number;
  }[];
}

export function LabTestCarousel({
  title,
  description,
  viewAllLink,
  tests,
}: LabTestCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [cardsPerRow, setCardsPerRow] = useState(3);

  const router = useRouter();

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

    // Handle responsive cards per row
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerRow(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerRow(2);
      } else {
        setCardsPerRow(3);
      }
      emblaApi.reInit();
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      window.removeEventListener('resize', handleResize);
    };
  }, [emblaApi, onSelect]);

  const handleSchedule = (id: string) => {
    console.log(`Scheduling test: ${id}`);
    router.push(`/popular-lab-test/${id}`);
  };

  // Group tests into rows (2 rows)
  const rows = [];
  const testsPerGroup = cardsPerRow;

  // Create groups of tests for the carousel
  for (let i = 0; i < tests.length; i += testsPerGroup * 2) {
    const group = {
      topRow: tests.slice(i, i + testsPerGroup),
      bottomRow: tests.slice(i + testsPerGroup, i + testsPerGroup * 2),
    };
    rows.push(group);
  }

  return (
    <div className="w-full bg-[#f5f8fa] py-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {description && (
              <p className="text-gray-600 mt-1 text-sm">{description}</p>
            )}
          </div>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-orange-500 hover:text-orange-600 transition-colors font-medium"
            >
              View all
            </a>
          )}
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {rows.map((group, groupIndex) => (
                <div
                  key={`group-${groupIndex}`}
                  className="flex-[0_0_100%] min-w-0"
                >
                  {/* Top row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {group.topRow.map((test) => (
                      <div key={test.id} className="min-w-0">
                        <TestCard
                          icon={test.icon}
                          title={test.title}
                          testCount={test.testCount}
                          price={test.price}
                          onSchedule={() => handleSchedule(test.id)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Bottom row (only if there are tests for it) */}
                  {group.bottomRow.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.bottomRow.map((test) => (
                        <div key={test.id} className="min-w-0">
                          <TestCard
                            icon={test.icon}
                            title={test.title}
                            testCount={test.testCount}
                            price={test.price}
                            onSchedule={() => handleSchedule(test.id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {prevBtnEnabled && (
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full shadow-md p-2 z-10"
              aria-label="Previous"
            >
              <ChevronRight className="h-5 w-5 transform rotate-180" />
            </button>
          )}

          {nextBtnEnabled && (
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full shadow-md p-2 z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
