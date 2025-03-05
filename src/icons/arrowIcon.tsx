import { SVGAttributes } from "react";

interface SvgProps extends SVGAttributes<SVGSVGElement> {
  arrowFillColor?: string;
}

export default function ArrowIcon(props: SvgProps) {
  const { arrowFillColor = "#90A4AE", ...rest } = props;
  return (
    <svg width="30" height="17" viewBox="0 0 10 7" fill="none" {...rest}>
      <path
        d="M1.175 0.149902L5 3.9749L8.825 0.149902L10 1.33324L5 6.33324L0 1.33324L1.175 0.149902Z"
        fill={arrowFillColor}
      />
    </svg>
  );
}
