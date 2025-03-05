import InfoPagesLayout from "@/src/layouts/info-ages-layout";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 p-0">
      <InfoPagesLayout />
      {children}
    </div>
  );
}
