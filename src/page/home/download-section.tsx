import ImgTab from "@/src/components/imgTab/img-tab";
import { DownloadAppButton } from "@/src/ui/buttons/app-download";

export default function DownloadSection() {
  return (
    <div className="flex justify-between relative items-end w-full  px-0 pt-[100px] max-lg:py-0 overflow-y-hidden">
      <div
        className="rounded-md m-2 h-[250px] max-sm:h-auto  w-full flex items-end"
        style={{
          boxShadow: "8px 7px 0px 0px rgba(242, 101, 34, 1)",
        }}
      >
        <div className="bg-white px-10 max-md:p-4 rounded-md text-4xl max-xl:text-3xl max-md:text-2xl w-full relative h-full flex flex-col justify-end pb-4  font-bold leading-none flex-1">
          <p>Download and get 20% discount</p>
          <span className="text-shade font-medium text-lg">
            let’s make your life easier!
          </span>
          <div className="flex items-center gap-3 py-5 flex-wrap">
            <DownloadAppButton type="App Store" />
            <DownloadAppButton type="Play Store" />
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -translate-x-1/3 max-[1150px]:-translate-x-[15%] max-lg:hidden">
        <ImgTab
          src="/downloadsection.png"
          alt="phone"
          className="h-[550px] w-[300px]"
        />
      </div>
    </div>
  );
}
