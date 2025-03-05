'use client';
import { Routes } from '@/routes.config';
import ImgTab from '@/src/components/imgTab/img-tab';
import SearchBox from '@/src/components/search-box/search-box';
import UploadPresButton from '@/src/components/upload-prescription-btn/upload-prescription-btn';
import ArrowIcon from '@/src/icons/arrowIcon';
import PaperSvg from '@/src/icons/paperSvg';
import SiteLayout from '@/src/layouts/site-layout';
import ColorfulButton from '@/src/ui/buttons/colorful-button';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-green-gradient max-md:bg-none  w-full pt-20 pb-10 max-md:pt-7 max-md:pb-1">
      <div className="flex items-center justify-center  flex-col w-1/2  max-xl:w-2/3 max-md:w-[90%] mx-auto">
        <h1 className="text-5xl max-lg:text-4xl font-bold text-center leading-[62px] max-md:hidden">
          Order Medicines and more..
        </h1>
        <p className="text-lg max-lg:text-base leading-6 font-light w-2/3 max-lg:w-[80%] text-center  max-md:hidden">
          Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum.
        </p>
        <SearchBox wrapperClass="mt-7 max-md:mt-0 w-full max-w-[800px]" />
        {/* <SearchSuggestionBox /> */}
        <div className="w-full flex items-center justify-end pt-2 text-xs  gap-3">
          <p className="flex items-center text-shade gap-1">
            <PaperSvg width={14} />
            Order with prescription.
          </p>
          <div>
            <UploadPresButton>
              <p className="flex items-center text-primary-500 gap-1">
                Upload now
                <ArrowIcon
                  arrowFillColor="#15A9A0"
                  className="-rotate-90"
                  width={14}
                />
              </p>
            </UploadPresButton>
          </div>
        </div>
      </div>
      <SiteLayout className="grid items-center grid-cols-4 gap-5 max-xl:gap-4 max-lg:grid-cols-2  px-10 max-xl:px-5 max-md:hidden">
        <ColorfulButton
          link={Routes.medicines}
          startIcon={<ImgTab src="/media/logoicons/medicineImg.png " />}
          endIcon={<ArrowIcon className="-rotate-90" width={15} />}
          bgColor="#E5F3FF"
        >
          Medicines
        </ColorfulButton>
        <ColorfulButton
          link={Routes.labTest}
          startIcon={<ImgTab src="/media/logoicons/labimg.png " />}
          endIcon={<ArrowIcon className="-rotate-90" width={15} />}
          bgColor="#E5E9FF"
        >
          Lab tests
        </ColorfulButton>
        <ColorfulButton
          link={Routes.healthProducts}
          startIcon={<ImgTab src="/media/logoicons/healthimg.png " />}
          endIcon={<ArrowIcon className="-rotate-90" width={15} />}
          bgColor="#FFE5E5"
        >
          Health products
        </ColorfulButton>
        <ColorfulButton
          link={Routes.myPrescriptions}
          startIcon={<ImgTab src="/media/logoicons/prescriptionimg.png " />}
          endIcon={<ArrowIcon className="-rotate-90" width={15} />}
          bgColor="#EEE5FF"
        >
          Upload Prescription
        </ColorfulButton>
      </SiteLayout>
      <div className="hidden  max-md:grid grid-cols-4 pt-7  gap-4 w-[95%] text-shade leading-tight text-xs  mx-auto">
        <div className="flex flex-col gap-2 items-center ">
          <Link
            href={Routes.medicines}
            className="bg-[#E5F3FF] p-1 aspect-square  w-full  rounded-lg flex items-center justify-center"
          >
            <Button className="w-full h-full bg-inherit">
              <ImgTab src="/media/logoicons/medicineImg.png " />
            </Button>
          </Link>
          <p className="text-center">Medicines</p>
        </div>
        <div className="flex flex-col gap-2 items-center ">
          <Link
            href={Routes.labTest}
            className="bg-[#E5E9FF] p-1 aspect-square  w-full  rounded-lg flex items-center justify-center"
          >
            <Button className="w-full h-full bg-inherit">
              <ImgTab src="/media/logoicons/labimg.png " />
            </Button>
          </Link>
          <p className="text-center"> Lab tests</p>
        </div>
        <div className="flex flex-col gap-2 items-center ">
          <Link
            href={Routes.healthProducts}
            className="bg-[#FFE5E5] p-1 aspect-square  w-full  rounded-lg flex items-center justify-center"
          >
            <Button className="w-full h-full bg-inherit">
              <ImgTab src="/media/logoicons/healthimg.png " />
            </Button>
          </Link>
          <p className="text-center"> Health products</p>
        </div>
        <div className="flex flex-col gap-2 items-center ">
          <Link
            href={Routes.myPrescriptions}
            className="bg-[#EEE5FF] p-1 aspect-square  w-full flex-1 rounded-lg flex items-center justify-center"
          >
            <Button className="w-full h-full bg-inherit">
              <ImgTab src="/media/logoicons/prescriptionimg.png " />
            </Button>
          </Link>
          <p className="text-center"> Upload Prescription</p>
        </div>
      </div>
    </div>
  );
}
