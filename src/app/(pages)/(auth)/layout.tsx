import ObserverLayouts from "@/src/layouts/observer-layouts";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <>
      <ObserverLayouts />
      {children}
    </>
  );
}
