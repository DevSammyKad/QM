"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CustomMyTab } from "./CustomMyTab";

type Props = {};

export default function MyHeader({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("status") || "all";

  const handleClicks = (param: string) => {
    if (param !== search) {
      router.replace(`${pathname}?status=${param}`, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <CustomMyTab
        selected={search === "all"}
        onClick={() => handleClicks("all")}
      >
        All
      </CustomMyTab>
      <CustomMyTab
        selected={search === "pending"}
        onClick={() => handleClicks("pending")}
      >
        Pending
      </CustomMyTab>
      <CustomMyTab
        selected={search === "delivered"}
        onClick={() => handleClicks("delivered")}
      >
        Delivered
      </CustomMyTab>
      <CustomMyTab
        selected={search === "cancelled"}
        onClick={() => handleClicks("cancelled")}
      >
        Cancelled
      </CustomMyTab>
    </div>
  );
}