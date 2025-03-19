'use client';
import React from 'react';
import ImgTab from './imgTab/img-tab';
import { useRouter } from 'next/navigation';

interface LabTestCardProps {
  id: number;
  testName: string;
  coverImage: string;
  mrp: number;
  sellingPrice: number;
  reportTime?: string;
  discount: number | string;
}

const LabTestCard = ({
  id,
  testName,
  coverImage,
  mrp,
  sellingPrice,
  discount,
}: LabTestCardProps) => {
  // Remove % from discount if present and convert to number

  const discountValue =
    typeof discount === 'string'
      ? parseFloat(discount.replace('%', ''))
      : discount;

  const router = useRouter();

  const handleNavigate = () => router.push(`/popular-lab-test/${id}`);

  const defaultImageUrl = '/HealthCheckUpImage.png';

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md bg-white">
      <div className="relative">
        <div className="h-40 w-full overflow-hidden">
          <ImgTab
            src={coverImage || '/HealthCheckUpImage.png'}
            alt={testName}
            width={300}
            height={160}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultImageUrl;
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{testName}</h3>
          <p className="text-sm text-gray-500 mb-2">
            Get reports within 18 hrs
          </p>

          <div className="flex items-center mb-4">
            <span className="text-xl font-bold mr-2">
              ₹{sellingPrice.toFixed(0)}
            </span>
            <span className="text-gray-500 line-through text-sm mr-2">
              ₹{mrp.toFixed(0)}
            </span>
            <span className="text-green-500 text-sm">{discountValue}% off</span>
          </div>

          <button
            onClick={handleNavigate}
            className="w-full py-2 px-4 bg-white border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-50 transition-colors"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabTestCard;
