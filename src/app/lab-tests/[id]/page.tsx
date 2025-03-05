"use client"; // Marking as client component

import { useEffect, useState } from "react";
import BreadCrumbs from "@/src/components/breadcrumbs/breadcrumbs";
import Paper2Svg from "@/src/icons/paper2Svg";
import UsersSvg from "@/src/icons/usersSvg";
import SiteLayout from "@/src/layouts/site-layout";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import { Divider } from "@nextui-org/react";

// Assuming you're passing `id` and `searchParams` as props
type Props = { params: { id: string }; searchParams: {} };

export default function Page({ params: { id } }: Props) {
  const [labTestData, setLabTestData] = useState<any>(null);

  // Fetch the lab test data dynamically
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://quickmeds.sndktech.online/labTest.popularTests?userId=1`,
        {
          method: "GET", // If you're doing a GET request
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Adding the authorization header
            "Content-Type": "application/json", // Optional, depending on your API needs
          },
        }
      );
      const data = await response.json();
      const testData = data.labTests.find(
        (test: any) => test.id === Number(id)
      );
      setLabTestData(testData);
    }
    fetchData();
  }, [id]);

  if (!labTestData) return <div>Loading...</div>; // Show loading state until data is fetched

  return (
    <SiteLayout className="py-5">
      <BreadCrumbs currentPathName={labTestData?.testName} />
      <div className="w-full h-full overflow-y-scroll flex items-start ">
        <div className="w-3/4 max-lg:w-full pr-5 flex flex-col gap-6">
          <img
            src={labTestData?.coverImage}
            alt="test"
            className="w-full aspect-video max-h-[300px]"
          />
          <div>
            <h1 className="text-2xl pb-2">{labTestData?.testName}</h1>
            <p>{labTestData?.description}</p>
          </div>
          <Divider />
          <div>
            <div className="flex items-center gap-5">
              <p className="text-gray-700">No of tests:</p>
              <p>{labTestData?.others.length} tests</p>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-gray-700">Sample required:</p>
              <p>{labTestData?.sampleRequired}</p>
            </div>
            <div className="flex items-start gap-5">
              <p className="text-gray-700">Preparations:</p>
              <div className="flex flex-col gap-2">
                <p>{labTestData?.preparations}</p>
              </div>
            </div>
          </div>
          <Divider />

          <div>
            <p className="text-2xl pb-2">
              Understanding {labTestData?.testName}
            </p>
            <div className="flex flex-col gap-2">
              {JSON.parse(labTestData?.others || "[]").map(
                (summary: any, i: number) => (
                  <p key={i}>{summary.body}</p>
                )
              )}
            </div>
          </div>
        </div>
        <div className=" w-1/4 max-lg:fixed max-lg:bottom-0 max-lg:z-[9999999] max-lg:left-0 max-lg:w-full max-lg:bg-white max-lg:py-2 max-lg:px-3 max-lg:border-t max-lg:shadow-lg flex flex-col gap-2 ">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2 items-center">
              <div className="flex  flex-col">
                <p className="text-3xl whitespace-nowrap max-sm:text-xl font-semibold ">
                  ₹{labTestData?.sellingPrice}
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-shade whitespace-nowrap line-through	 max-sm:text-sm">
                    ₹{labTestData?.mrp}{" "}
                  </p>
                  <span className="text-primary-500 whitespace-nowrap font-normal">
                    {labTestData?.discount} off
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 ">
                <div className="grid grid-cols-[max-content_1fr] gap-1 align-baseline  items-baseline text-gray-600">
                  <Paper2Svg />{" "}
                  <span className="">71,135 people booked this recently</span>
                </div>
                <div className="grid grid-cols-[max-content_1fr] gap-1 items-baseline text-gray-600">
                  <UsersSvg /> Earliest report expected within 18 hours
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 max-sm:gap-0">
              <PrimaryButton className="rounded-3xl py-3 mt-2 max-sm:py-2 font-semibold justify-start">
                <p className="flex-1 text-center">Book</p>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
