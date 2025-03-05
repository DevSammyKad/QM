'use client';
/* eslint-disable @next/next/no-img-element */
import { Routes } from '@/routes.config';
import { CheckupCardType } from '@/src/types';
import Link from 'next/link';
type CardType = {
  forCarousel?: boolean;
  data: CheckupCardType;
};
export default function CheckupCard({ data, forCarousel }: CardType) {
  const {
    actualPrice,
    imgUrl,
    sellingPrice,
    title,
    offer = 7,
    description,
    id,
  } = data;

  return (
    <Link
      href={`${Routes.labTest}/${id}`}
      className={`border cursor-pointer ${
        forCarousel ? 'min-w-[300px]' : 'w-full'
      } bg-white w-full relative shadow-product-card rounded-2xl overflow-hidden`}
    >
      <div className="flex items-center justify-center">
        <img
          src={imgUrl}
          alt="product"
          className="object-cover object-top w-full aspect-video "
        />
      </div>
      <div className="flex flex-col p-4">
        <h2 className="line-clamp-2 font-semibold leading-tight">{title}</h2>
        <span className="text-xs text-shade">{description}</span>
        <div className="font-extrabold pt-1 flex items-center gap-2 text-lg ">
          <span>₹{sellingPrice}</span>
          <s className="pl-1 opacity-60">₹{actualPrice}</s>
          <span className=" leading-none text-xs text-primary-500">
            {offer}% off
          </span>
        </div>
      </div>
    </Link>
  );
}
