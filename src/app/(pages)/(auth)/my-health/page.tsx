import { Routes } from "@/routes.config";
import ImgTab from "@/src/components/imgTab/img-tab";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex  pb-10 max-lg:flex-col items-center gap-10">
      <div className="w-[35%] flex  justify-center items-center max-lg:w-full">
        <ImgTab
          src="/media/myhealth/main.png"
          alt="myhealth"
          className="w-full max-lg:w-[400px]  max-md:w-[300px] max-sm:w-[250px] aspect-square"
        />
      </div>
      <div className="grid grid-cols-3 flex-1 max-lg:w-full text-shade text-lg max-sm:text-base max-sm:gap-2 text-center capitalize font-medium items-center gap-5">
        <Link
          href={Routes.myPrescriptions}
          className="flex flex-col gap-2 items-center cursor-pointer justify-between h-full"
        >
          <div className=" flex items-center justify-center w-full aspect-square p-3 rounded-xl shadow-product-card bg-purple-light">
            <ImgTab
              src="/media/myhealth/my-prescriptions.png"
              alt="my-prescriptions"
              className="w-[150px]"
            />
          </div>
          <p>My prescriptions</p>
        </Link>
        <Link
          href={Routes.myMedicines}
          className="flex flex-col gap-2 items-center cursor-pointer justify-between h-full"
        >
          <div className=" flex items-center justify-center w-full aspect-square p-3 rounded-xl shadow-product-card bg-blue-light">
            <ImgTab
              src="/media/myhealth/my-lab-test.png"
              alt="my-lab-test"
              className="w-[150px]"
            />
          </div>
          <p>My medicines</p>
        </Link>
        <Link
          href={Routes.myLabTests}
          className="flex flex-col gap-2 items-center cursor-pointer justify-between h-full"
        >
          <div className=" flex items-center justify-center w-full aspect-square p-3 rounded-xl shadow-product-card bg-red-light">
            <ImgTab
              src="/media/myhealth/my-medicines.png"
              alt="my-medicines"
              className="w-[150px]"
            />
          </div>
          <p>My lab tests</p>
        </Link>
      </div>
    </div>
  );
}
