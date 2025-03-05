"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const HeaderLink = ({
  href,
  children,
}: {
  children: ReactNode;
  href: string;
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`text-base leading-[28px] whitespace-nowrap font-medium  hover:text-primary-500 border-b-2 ${
        pathname === href
          ? "text-primary-500 border-primary-500 "
          : "text-shade border-transparent"
      }`}
    >
      {children}
    </Link>
  );
};
