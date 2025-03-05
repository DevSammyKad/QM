"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BackButtonWrapper({ children }: Props) {
  const router = useRouter();
  const simonGoBackHandler = () => {
    if (window.history.length > 1) {
      router.back();
    }
    router.push("/");
  };
  return (
    <div onClick={simonGoBackHandler} className="cursor-pointer">
      {children}
    </div>
  );
}
