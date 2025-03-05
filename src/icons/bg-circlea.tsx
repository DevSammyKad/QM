import { SVGAttributes } from "react";

interface CircleProps extends SVGAttributes<SVGElement> {}

export default function BgCircleA(props: CircleProps) {
  return (
    <svg
      width="196"
      height="156"
      viewBox="0 0 196 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_dd_195_112596)">
        <circle cx="193" cy="-37" r="177" fill="#CFD8DC" />
        <circle cx="193" cy="-37" r="177" fill="#E6EEF8" />
      </g>
      <defs>
        <filter
          id="filter0_dd_195_112596"
          x="0"
          y="-230"
          width="386"
          height="386"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_195_112596"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-4" dy="-4" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.992157 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_195_112596"
            result="effect2_dropShadow_195_112596"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_195_112596"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
