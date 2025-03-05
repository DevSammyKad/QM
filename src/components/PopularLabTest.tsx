import { dummyPopularLabTestData } from '@/dummyData';
import React from 'react';
import ArrowIcon from '../icons/arrowIcon';
import { CheckupCardType } from '../types';

type CardType = {
  forCarousel?: boolean;
  data: CheckupCardType;
};
// { data, forCarousel }: CardType)
const PopularLabTest = () => {
  //   const { imgUrl, price ,  title,  description, id } = data;
  return (
    <div className="grid grid-cols-2 gap-5 mt-10">
      {dummyPopularLabTestData.map((item, index) => (
        <div
          className="w-[500px] flex  items-center gap-5 p-5 border border-slate-200 rounded-xl"
          key={index}
        >
          <div className="border-2 border-slate-200 rounded-xl w-[140px] h-[140px] p-2 flex justify-center items-center">
            <img
              src={item.imgUrl}
              alt="labtest"
              className=" object-cover border-2 border-slate-500 rounded-xl "
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1>{item.title}</h1>
            <p className="text-sm text-gray-500">{item.description}</p>
            <div className="flex justify-between items-center">
              <p>{item.price} Onwards</p>{' '}
              <button className="flex items-center gap-2 px-3 py-1 text-red-500">
                Schedule Now{' '}
                {/* <ArrowIcon className="-rotate-90 text-red-500 bg-red-500" />
                <ArrowIcon className="-rotate-90 text-red-500 bg-red-500" /> */}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularLabTest;
