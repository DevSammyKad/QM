export default function StarSvg({
  filled,
  height = 16,
  width = 16,
}: {
  filled?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.01135 0L10.3233 5.48516L16 6.12418L11.7497 10.1297L12.9255 16L7.98699 12.9902L3.037 15.9795L4.23497 10.1137L0 6.09081L5.67875 5.47543L8.01135 0Z"
        fill={filled ? "#15A9A0" : ""}
        stroke={filled ? "" : "#90A4AE"}
      />
    </svg>
  );
}
