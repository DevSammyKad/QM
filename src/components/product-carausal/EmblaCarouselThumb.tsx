/* eslint-disable @next/next/no-img-element */
"use client";
import "./embla.css";

type PropType = {
  selected: boolean;
  image: { url: string; id: number };
  onClick: () => void;
};

export const Thumb = (props: PropType) => {
  const { selected, image, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " border border-[#F26522] rounded" : ""
      )}
    >
      <div
        onClick={onClick}
        className="embla-thumbs__slide__number w-full h-[70px]"
      >
        <img
          src={image.url}
          className="w-[54px] h-[70px] object-contain"
          alt={image.url}
        />
      </div>
    </div>
  );
};
