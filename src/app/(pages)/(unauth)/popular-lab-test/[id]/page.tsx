'use client'; // Marking as client component

import { useEffect, useState } from 'react';
import BreadCrumbs from '@/src/components/breadcrumbs/breadcrumbs';
import Paper2Svg from '@/src/icons/paper2Svg';
import UsersSvg from '@/src/icons/usersSvg';
import SiteLayout from '@/src/layouts/site-layout';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import { Divider } from '@nextui-org/react';
import Api, { header } from '../../../utils/Api';
import ImgTab from '@/src/components/imgTab/img-tab';
import QuickMedsLogoSvg from '@/src/icons/quickMedsLogoSvg';
import CallSvg from '@/src/icons/callSvg';
import WhatsappIcon from '@/src/icons/whatsappIcon';

// Assuming you're passing `id` and `searchParams` as props

interface LabTest {
  id: number;
  bannerImage: string;
  coverImage: string;
  testName: string;
  description: string;
  mrp: number;
  sellingPrice: number;
  preparations: string;
  sampleRequired: string;
  recommendedFor: string;
  others: { heading: string; body: string }[];
  faq: { question: string; answer: string }[];
  discount: string;
  favorite: boolean;
}

type Props = { params: { id: string }; searchParams: Record<string, unknown> };

export default function Page({ params: { id } }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Toggle FAQ item expansion
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const [labTestData, setLabTestData] = useState<LabTest | null>(null);

  // Fetch the lab test data dynamically
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(Api.LabTest(id), {
        headers: header,
      });
      if (!response.ok) {
        console.error('Error fetching data:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Fetched Lab Test Data:', data); // Check what the data looks like

      setLabTestData({
        ...data.labTest,
        others: JSON.parse(data.labTest.others || '[]'),
        faq: JSON.parse(data.labTest.faq || '[]'),
      });
    }
    fetchData();
  }, [id]);

  if (!labTestData) return <div>Data Not Found...</div>; // Show loading state until data is fetched

  const defaultImageUrl =
    'https://s3-alpha-sig.figma.com/img/57cb/616a/2266f3507ea43402741c8124757f2399?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FerCjrJON1JPEE4WzySi5gdfO7DBGMphrFBMcRTvFMXHpmXA36EXSCS3rdfgCJzqaH4F8GGT4WCH7Tr0FMWp7ZQ6-3OFb4TDJ4VpjswqhQoFX5too2A~tbJ9ggnG3osZ6FnW5T3wZi4gXclC2hOi66Z4LIB4ED6GePtX9nuzd6kSk0mwbu637-sWr-Tei0HY5PYog-ad9sRygqWp5m5H-jZVR0YQBQcSPMOghJYrZvRrGydV-BXeSBs-OeqF2gVsHi7ScLDO~SvDRm6gJQ3o~WzOEAVJ1vjwfXbc5UxHyQ6CCKpMmsWQTrL3Xz7zDTlMbC4ucYIB4kEJTSI4d9Uszw__';

  return (
    <div>
      {/* <BreadCrumbs currentPathName={labTestData?.testName} /> */}
      <div className="w-full h-full overflow-y-scroll flex items-start ">
        <div className="w-3/4 max-lg:w-full pr-5 flex flex-col gap-6">
          <img
            src={labTestData?.bannerImage || defaultImageUrl}
            alt="test"
            className="w-full aspect-video max-h-[300px]   object-cover rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultImageUrl;
            }}
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
          <div className="w-full gap-10  py-4 flex flex-col md:flex-row justify-between items-center">
            {/* <!-- Left section with logo and text --> */}
            <div className="flex items-center gap-10 mb-4 md:mb-0">
              <div className="flex flex-col ">
                <h1 className="text-xl text-bold">Powered by</h1>
                <div className="mr-4">
                  <QuickMedsLogoSvg />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">Quick meds</h2>
                <div className="flex items-center mt-1">
                  <svg
                    className="w-5 h-5 text-black fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <p className="ml-1 text-sm">Most trusted by customers</p>
                </div>
              </div>
            </div>

            {/* <!-- Right section with badges --> */}
            <div className="flex  items-center justify-between space-x-4 md:space-x-8">
              {/* <!-- ISO Certified Badge --> */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-200 p-4 rounded-full mb-2">
                  <svg
                    className="w-16 h-16 text-orange-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">ISO</p>
                <p className="text-sm">certified</p>
              </div>

              {/* <!-- Trained Technicians Badge --> */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-200 p-4 rounded-full mb-2">
                  <svg
                    className="w-16 h-16 text-orange-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Trained</p>
                <p className="text-sm">Technicians</p>
              </div>

              {/* <!-- Hygiene First Badge --> */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-200 p-4 rounded-full mb-2">
                  <svg
                    className="w-16 h-16 text-orange-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Hygiene</p>
                <p className="text-sm">first</p>
              </div>

              {/* <!-- Accurate Reports Badge --> */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-200 p-4 rounded-full mb-2">
                  <svg
                    className="w-16 h-16 text-orange-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Accurate</p>
                <p className="text-sm">reports</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-2xl pb-2">
              Understanding {labTestData?.testName}
            </p>
            <div className="flex flex-col gap-2">
              {labTestData.others.map((summary, i) => (
                <p key={i}>{summary.body}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-2xl pb-2">Recommend for</p>
            <div className="flex flex-col gap-2">
              {labTestData.recommendedFor}
            </div>
          </div>

          {/* Frequently Booked together  */}
          <div>
            <p className="text-2xl pb-2">Frequently Booked together</p>
            <div className="flex flex-col gap-2">{labTestData.discount}</div>
          </div>

          <div className="divide-y divide-gray-200">
            {labTestData.faq.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleExpand(index)}
                  aria-expanded={expandedId === index}
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 transition-transform duration-200 ${
                      expandedId === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {expandedId === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <p className="text-2xl pb-2">Need help ?</p>
            <div className="flex gap-6">
              <div className="flex items-center gap-5">
                <CallSvg />

                <div className="flex flex-col gap-2">
                  <h2>+91 0987654321</h2>
                  <p>
                    Call our health adviser to book Our team of experts will
                    guide you
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <WhatsappIcon />

                <div className="flex flex-col gap-2">
                  <h2>+91 0987654321</h2>
                  <p>
                    Call our health adviser to book Our team of experts will
                    guide you
                  </p>
                </div>
              </div>
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
                    ₹{labTestData?.mrp}{' '}
                  </p>
                  <span className="text-primary-500 whitespace-nowrap font-normal">
                    {labTestData?.discount} off
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 ">
                <div className="grid grid-cols-[max-content_1fr] gap-1 align-baseline  items-baseline text-gray-600">
                  <Paper2Svg />{' '}
                  <span className="">71,135 people booked this recently</span>
                </div>
                <div className="grid grid-cols-[max-content_1fr] gap-1 items-baseline text-gray-600">
                  <UsersSvg /> Earliest report expected within 18 hours
                </div>
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
  );
}
