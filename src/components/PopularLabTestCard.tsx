import { dummyPopularLabTestData } from '@/dummyData';
import React from 'react';
import ArrowIcon from '../icons/arrowIcon';
import { LabTestType } from '../types';
import Link from 'next/link';
import { Routes } from '@/routes.config';

type CardType = {
  forCarousel?: boolean;
  data: LabTestType;
};
// { data, forCarousel }: CardType)
const PopularLabTestCard = ({ data, forCarousel }: CardType) => {
  const { id, mrp, testName, coverImage, description } = data;
  return (
    <Link
      href={`${Routes.popularLabTest}/${id}`}
      className={`border cursor-pointer ${
        forCarousel ? 'min-w-[300px]' : 'w-full'
      } bg-white w-full relative shadow-product-card rounded-2xl overflow-hidden`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* {dummyPopularLabTestData.map((item, index) => ( */}
        <div
          className="md:w-[500px] flex  items-center gap-5 p-5 border border-slate-200 rounded-xl"
          key={id}
        >
          <div className="border-2 border-slate-200 rounded-xl w-[140px] h-[140px] p-2 flex justify-center items-center">
            <img
              src={coverImage || '/LabTestheart.png'}
              alt="lab-test"
              className=" object-cover border-2 border-slate-500 rounded-xl "
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1>{testName}</h1>
            <p className="text-sm text-gray-500">{description}</p>
            <div className="flex justify-between items-center">
              <p>{mrp} Onwards</p>{' '}
              <button className="flex items-center gap-2 px-3 py-1 text-red-500">
                Schedule Now{' '}
                {/* <ArrowIcon className="-rotate-90 text-red-500 bg-red-500" />
                <ArrowIcon className="-rotate-90 text-red-500 bg-red-500" /> */}
              </button>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
    </Link>
  );
};

export default PopularLabTestCard;
