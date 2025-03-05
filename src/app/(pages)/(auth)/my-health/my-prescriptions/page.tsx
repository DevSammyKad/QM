'use client';
import ImgTab from '@/src/components/imgTab/img-tab';
import UploadPresButton from '@/src/components/upload-prescription-btn/upload-prescription-btn';
import ArrowIcon from '@/src/icons/arrowIcon';
import ZoomSvg from '@/src/icons/zoomSvg';
import BackButtonWrapper from '@/src/ui/wrappers/BackButtonWrapper';
import { useEffect, useState } from 'react';

export default function page() {
  // State to manage prescriptions and loading/error states
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(
          'https://quickmeds.sndktech.online/priscription.getAll',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-authorization':
                'RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph', // Authorization token
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2NzQ1Mzg1LCJleHAiOjE3NDgzMDI5ODV9.5wRlYbaliLtMW57h7YCASiJZsESXS1Ouo6i48zuIyTI',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch prescriptions');
        }

        const data = await response.json();
        setPrescriptions(data.data); // Set the fetched prescription data
      } catch (error) {
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt
      }
    };

    fetchPrescriptions();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div className="grid grid-cols-2 space-x-8">
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center gap-3 ">
          <BackButtonWrapper>
            <ArrowIcon
              arrowFillColor="#15A9A0"
              width={18}
              className="rotate-90"
            />
          </BackButtonWrapper>
          My Prescriptions
        </div>
        {/* Loading and error handling */}
        {loading && (
          <div className="text-center mt-5">Loading prescriptions...</div>
        )}
        {error && <div className="text-center text-red-500 mt-5">{error}</div>}

        <div className="flex flex-wrap gap-5 px-5 py-5">
          {/* Display prescriptions */}
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription: any) => (
              <div
                key={prescription.id}
                className="w-[110px] h-[150px] group relative cursor-pointer rounded overflow-hidden"
              >
                <div className="absolute bottom-2  group-hover:block hidden bg-black/30 rounded-full p-1 right-2">
                  <ZoomSvg />
                </div>
                <ImgTab
                  src={prescription.imageUrl || '/prescriptionImg.png'} // Use imageUrl from API or fallback to default
                  alt="prescription"
                  className="w-full h-full"
                />
              </div>
            ))
          ) : (
            <div className="text-center mt-5">No prescriptions available.</div>
          )}
        </div>
        <div className="w-fit px-5">
          <UploadPresButton>
            <div className="text-primary-500 font-medium border border-primary-500 py-1 px-3 rounded-lg">
              Upload Prescription
            </div>
          </UploadPresButton>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl">
        <h1 className="text-primary-500 mx-5 my-4 font-medium text-2xl">
          Guide For Valid Prescription
        </h1>

        <div className="flex space-x-10">
          <div className="flex items-center justify-center">
            <img
              src="/prescriptionGuide.png"
              alt="Expert Advice"
              className="object-cover object-top w-full h-ful rounded-lg "
            />
          </div>
          <div>
            <ul className="list-disc">
              {guideList.map((list) => (
                <li className="my-7" key={list}>
                  {list}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// const prescriptionsUrl = [
//   "/prescriptionImg.png",
//   "/prescriptionImg.png",
//   "/prescriptionImg.png",
// ];

const guideList = [
  'Don’t crop out any part of the image',
  'Avoid blurred image',
  'Include details of doctor and patient + clinic visit date',
  'Medicines will be dispensed as per prescription',
  'Supported files type: jpeg , jpg , png , pdf',
  'Maximum allowed file size: 5MB',
];
