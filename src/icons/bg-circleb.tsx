import { SVGAttributes } from "react";

interface CircleProps extends SVGAttributes<SVGElement> {}

export default function BgCircleB(props: CircleProps) {
  return (
    <svg
      width="188"
      height="350"
      viewBox="0 0 188 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_dd_4_26966)">
        <circle cx="-20" cy="208" r="192" fill="#CFD8DC" />
        <circle cx="-20" cy="208" r="192" fill="#E6EEF8" />
      </g>
      <g filter="url(#filter1_dd_4_26966)">
        <circle cx="5" cy="162" r="97" fill="#CFD8DC" />
        <circle cx="5" cy="162" r="97" fill="#E6EEF8" />
      </g>
      <defs>
        <filter
          id="filter0_dd_4_26966"
          x="-228"
          y="0"
          width="416"
          height="416"
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
            result="effect1_dropShadow_4_26966"
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
            in2="effect1_dropShadow_4_26966"
            result="effect2_dropShadow_4_26966"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_4_26966"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_dd_4_26966"
          x="-108"
          y="49"
          width="226"
          height="226"
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
            result="effect1_dropShadow_4_26966"
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
            in2="effect1_dropShadow_4_26966"
            result="effect2_dropShadow_4_26966"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_4_26966"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
