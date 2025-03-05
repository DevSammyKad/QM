"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CustomMyTab } from "./CustomMyTab";

type Props = {};

export default function MyHeader({}: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const search = searchParams.get("status");

  const handleClicks = (param: string) => {
    if (param !== search) {
      router.replace(`${pathname}?status=${param}`);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <CustomMyTab
        selected={search === null || search === "all"}
        onClick={() => handleClicks("all")}
      >
        All
      </CustomMyTab>
      <CustomMyTab
        selected={search === "upcoming"}
        onClick={() => handleClicks("upcoming")}
      >
        Upcoming
      </CustomMyTab>
      <CustomMyTab
        selected={search === "completed"}
        onClick={() => handleClicks("completed")}
      >
        Completed
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
