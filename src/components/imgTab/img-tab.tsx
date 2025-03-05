/* eslint-disable @next/next/no-img-element */
import { cn } from "@/cn.config";
import { ImgHTMLAttributes } from "react";

interface props extends ImgHTMLAttributes<HTMLImageElement> {}

export default function ImgTab(props: props) {
  const { className, ...rest } = props;
  return (
    <img className={cn("aspect-square w-16 ", className)} alt="" {...rest} />
  );
}
