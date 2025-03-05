import FourOFourSvg from "../icons/svg-images/404Svg";

export default function NotFound() {
  return (
    <div className="w-full ">
      <h1 className="invisible">404</h1>
      <div className="flex justify-center items-center  w-full h-fit relative">
        <FourOFourSvg />
        <p className="text-shade text-2xl max-sm:text-lg text-center absolute bottom-[50px] max-md:bottom-[100px] left-1/2 -translate-x-1/2">
          Page not Found
        </p>
      </div>
    </div>
  );
}
