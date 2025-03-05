import React, { SVGAttributes } from "react";

interface SvgProps extends SVGAttributes<SVGSVGElement> {}

export default function SearchSvg(props: SvgProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.2863 19.2858L14.2863 14.2858M8.57199 16.4286C10.6558 16.4286 12.6543 15.6008 14.1278 14.1273C15.6013 12.6538 16.4291 10.6553 16.4291 8.5715C16.4291 6.48766 15.6013 4.48916 14.1278 3.01566C12.6543 1.54216 10.6558 0.714355 8.57199 0.714355C6.48814 0.714355 4.48965 1.54216 3.01615 3.01566C1.54265 4.48916 0.714844 6.48766 0.714844 8.5715C0.714844 10.6553 1.54265 12.6538 3.01615 14.1273C4.48965 15.6008 6.48814 16.4286 8.57199 16.4286Z"
        stroke="#90A4AE"
        strokeWidth="2.28571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
