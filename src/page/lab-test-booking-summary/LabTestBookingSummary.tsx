'use client';

import Api, { header } from '@/src/app/(pages)/utils/Api';
import LocationSvg from '@/src/icons/locationSvg';
import { Calendar, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BillSummary from '../lab-test-cart/BillSummary';

interface LabTestBookingData {
  id: number;
  userId: number;
  labTestId: number;
  patientId: string; // Array stored as a string
  sampleCollectionDate: string;
  sampleCollectionAddress: string;
  note: string;
  otherDetails: string;
  status: string;
  slot_price: string;
  slot_time: string;
  prescription: string | null;
  slot_date: string;
  isDefault: boolean;
  cancelReason: string | null;
  cartMrp: string | null;
  otherServices: string | null;
  totalDiscount: string | null;
  totalPayment: string | null;
  orderId: string | null;
  createdAt: string;
  updatedAt: string;
  title: string;
  image: string;
}

const LabTestBookingSummary = ({ BookingId }: { BookingId: number }) => {
  const [labTestBookingSummaryData, setLabTestBookingSummaryData] =
    useState<LabTestBookingData | null>(null);
  const [cartData, setCartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log('BookingId received in LabTestBookingSummary:', BookingId);
  useEffect(() => {
    if (!BookingId) return;
    fetchLabTestBookingSummary(BookingId);
  }, [BookingId]);

  const fetchLabTestBookingSummary = async (BookingId: number) => {
    try {
      const response = await fetch(Api.LabTestBookingSummary(BookingId), {
        method: 'GET',
        headers: header,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }

      const data = await response.json();
      console.log('Booking Summary Data', data);

      if (!data.TestBooking) {
        throw new Error('Could not find booking data');
      }

      // Ensure that the data matches the expected structure
      setLabTestBookingSummaryData(data.TestBooking);
      setCartData(data.labTestCart || []);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading Test Booking Summary...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!labTestBookingSummaryData) {
    return <div>No booking data available</div>;
  }

  const router = useRouter();

  const defaultImageUrl = '/LabTestDummy.png';

  const handleContinue = () => {
    // Preserve the booking ID when navigating to payment
    router.push(`/payment?bookingId=${labTestBookingSummaryData.id}`);
  };

  return (
    <div className="w-full mx-auto font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {/* Patient Info */}
          <div className="flex items-start justify-between border-b pb-4 mb-4">
            <div className="flex items-center">
              <div className="text-gray-400 mr-3">
                <User />
              </div>
              <div>
                <p className="text-gray-600">
                  {
                    JSON.parse(labTestBookingSummaryData.patientId)[0]
                      .patientName
                  }
                </p>
                <p className="text-gray-400 text-sm space-x-2">
                  <span className="capitalize">
                    {JSON.parse(labTestBookingSummaryData.patientId)[0].gender},
                  </span>
                  <span>
                    {JSON.parse(labTestBookingSummaryData.patientId)[0].dob}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Date */}
          <div className="flex items-start justify-between border-b pb-4 mb-4">
            <div className="flex items-center">
              <div className="text-gray-400 mr-3">
                <Calendar />
              </div>
              <div>
                <p className="text-gray-600">
                  {labTestBookingSummaryData.slot_date},{' '}
                  {labTestBookingSummaryData.slot_time},{' '}
                </p>

                <p className="text-gray-400 text-sm">Sample collection slot</p>
              </div>
            </div>
          </div>

          {/* Collection Address */}
          <div className="flex items-start justify-between border-b pb-4 mb-4">
            <div className="flex items-center">
              <div className="text-gray-400 mr-3">
                <LocationSvg />
              </div>
              <div>
                <p className="text-gray-600">
                  {labTestBookingSummaryData.sampleCollectionAddress}
                </p>
                <p className="text-gray-400 text-sm">
                  Sample collection address
                </p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Please note:</p>
            <p className="text-gray-500 text-sm">
              Overnight fasting (8-12 hrs) is required. Do not eat or drink
              anything except water before...
              <button className="text-teal-500 hover:text-teal-600 ml-1">
                read more
              </button>
            </p>
          </div>

          {/* Prescription Buttons
          <div className="flex gap-3 mb-6">
            <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors">
              My Prescriptions
            </button>
            <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors">
              Add New Prescription
            </button>
          </div>

          <p className="text-orange-500 text-sm">Doesn't have prescription</p> */}

          {/* Other Details */}
          <div className="mt-8">
            <h3 className="text-gray-500 text-lg mb-3">Others details</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {labTestBookingSummaryData.otherDetails ||
                `Quick meds is a technology platform to facilitate transaction of
              business. The products and services are offered for sale by the
              sellers. The user authorizes the delivery personnel to be his
              agent for delivery of the goods. For details read terms and
              conditions`}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Test Info */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl text-gray-500 mb-1">Tests</h2>
            <p className="text-gray-400 text-sm mb-4">
              Conducted by Quick meds | Labs
            </p>

            <div className="flex items-start gap-4 mb-2">
              <div className="flex-shrink-0 w-16 h-16 relative overflow-hidden rounded">
                <img
                  src={labTestBookingSummaryData.image}
                  alt="Test"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultImageUrl;
                  }}
                />
              </div>
              <div>
                <p className="text-gray-500">
                  {labTestBookingSummaryData.title}
                </p>
                <p className="text-teal-500 mt-2">
                  E-report by {labTestBookingSummaryData.updatedAt},{' '}
                </p>
              </div>
            </div>
          </div>

          {/* <BillSummary cartData={cartData} /> */}
          {/* Bill Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl text-gray-500 mb-4">Bill summary</h2>

            <div className="flex justify-between mb-3">
              <p className="text-gray-500">Cart MRP</p>
              <p className="text-gray-600">
                ₹{(Number(labTestBookingSummaryData.cartMrp) || 0).toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between mb-3">
              <p className="text-gray-500">Other services</p>
              <p className="text-gray-600">
                ₹
                {(Number(labTestBookingSummaryData.otherServices) || 0).toFixed(
                  2
                )}
              </p>
            </div>

            <div className="flex justify-between mb-3">
              <p className="text-gray-500">Total discount</p>
              <p className="text-green-600">
                -₹
                {(Number(labTestBookingSummaryData.totalDiscount) || 0).toFixed(
                  2
                )}
              </p>
            </div>

            <div className="border-t pt-3 flex justify-between font-medium">
              <p className="text-gray-500">To be paid</p>
              <p className="text-gray-600">
                ₹
                {(Number(labTestBookingSummaryData.totalPayment) || 0).toFixed(
                  2
                )}
              </p>
            </div>

            {/* Final Amount and Continue Button */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">To be paid</p>
                <p className="text-2xl text-gray-500">
                  ₹
                  {(
                    Number(labTestBookingSummaryData.totalPayment) || 0
                  ).toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleContinue}
                className="bg-teal-500 text-white px-8 py-3 rounded hover:bg-teal-600 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestBookingSummary;
