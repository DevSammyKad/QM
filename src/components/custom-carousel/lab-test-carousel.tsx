'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import ImgTab from '../imgTab/img-tab';
import { useRouter } from 'next/navigation';
// import { Card } from '@/components/ui/card';

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
    <div className="flex p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center mr-4">
        <ImgTab
          src={icon || '/LabTestDummy.png'}
          alt={title}
          width={48}
          height={48}
          className="object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImageUrl;
          }}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">Contains {testCount} tests</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-lg font-semibold">₹{price}</span>
            <span className="text-sm text-gray-500 ml-1">onwards</span>
          </div>
          <button
            onClick={onSchedule}
            className="flex items-center text-orange-500 hover:text-orange-600 transition-colors"
          >
            Schedule now
            <ChevronRight className="ml-1 h-4 w-4" />
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(2);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle responsive visible items
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else {
        setVisibleItems(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex + visibleItems < tests.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSchedule = (id: string) => {
    console.log(`Scheduling test: ${id}`);
    router.push(`/popular-lab-test/${id}`);
  };

  return (
    <div className="w-full bg-[#f5f8fa] py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              View all
            </a>
          )}
        </div>

        <div className="relative">
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleItems)
                }%)`,
              }}
            >
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="w-full md:w-1/2 flex-shrink-0 p-2"
                >
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
          </div>

          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full shadow-md p-2 z-10"
              aria-label="Previous"
            >
              <ChevronRight className="h-5 w-5 transform rotate-180" />
            </button>
          )}

          {currentIndex + visibleItems < tests.length && (
            <button
              onClick={handleNext}
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
