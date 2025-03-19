import React from 'react';
import Address from '@/src/page/cart/address';
import Bill from '@/src/page/cart/bill';
import { OutLinedButton } from '@/src/ui/buttons/buttons';
import Image from 'next/image';
import { dummyProductCardData } from '@/dummyData';
import LabTestTracker from '@/src/page/lab-test-tracking/LabTestTracker';

const data = dummyProductCardData.slice(0, 5);

// This We can show search and all tracking details

const page = () => {
  return (
    <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 justify-items-center">
      <div className="w-full lg:col-span-2">
        <LabTestTracker bookingId={79} />
        <div className=" bg-white shadow-sm my-5">
          <div className="text-sm text-gray-500 p-4">
            Arriving by Tue, 19 Mar
            <span className="float-right">1/1</span>
          </div>

          <div className="border-t border-gray-100">
            {/* First Product */}
            {data.map((item, index) => (
              <div key={index} className="flex items-center  border-t p-4">
                <div className="w-20 h-20 mr-4 bg-gray-100 rounded-md overflow-hidden relative">
                  <Image
                    src={item.imgUrl}
                    alt="Medical test"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-orange-500">
                    E-report by {item.title}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.sellingPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Bill />
        <Address />
        <div className="flex flex-col gap-4">
          <OutLinedButton>Cancel Order</OutLinedButton>
        </div>
      </div>
    </div>
  );
};

export default page;
