"use client";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  title?: string;
  link?: string;
  titleDescription?: string;
  children: ReactNode;
};

export default function CarouselTitleBox({
  children,
  link,
  title,
  titleDescription,
}: Props) {
  return (
    <div className="w-full">
      {title && (
        <div className="font-semibold text-[28px] max-lg:text-2xl  pb-4 flex flex-col gap-1">
          <div className="flex items-end justify-between">
            <span className="leading-none">{title}</span>
            {link && (
              <Link
                href={link}
                className="text-lg whitespace-nowrap max-sm:text-base text-secondary-500 hover:underline  cursor-pointer"
              >
                View all
              </Link>
            )}
          </div>
          {titleDescription && (
            <span className="text-shade text-sm">{titleDescription}</span>
          )}{" "}
        </div>
      )}
      {children}
    </div>
  );
}
