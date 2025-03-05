import { cn } from "@/cn.config";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function SiteLayout(props: props) {
  return (
    <div
      className={cn(
        "w-[90%] max-md:w-full px-3 max-sm:px-3 overflow-hidden mx-auto max-w-[1920px] py-10 max-sm:py-5",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
