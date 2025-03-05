"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ReactNode } from "react";
import "./custom.css";
import { NextButton, PrevButton, usePrevNextButtons } from "./prevBtn";
type PropType = {
  slideDataLength: number;
  options?: EmblaOptionsType;
  enableBtn?: boolean;
  plugins?: any[];
  renderProp: () => ReactNode;
};

const OPTIONS: EmblaOptionsType = { align: "start", dragFree: true, axis: "x" };

const Carousel = (props: PropType) => {
  const {
    slideDataLength,
    options = OPTIONS,
    enableBtn,
    plugins = [WheelGesturesPlugin()],
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="overflow-hidden w-full min-w-[100%] " ref={emblaRef}>
        <div className={` px-2 w-full flex gap-5 touch-pan-y`}>
          {props.renderProp()}
        </div>
      </div>
      {enableBtn && (
        <div className=" grid grid-cols-[auto] justify-between gap-5 ">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
