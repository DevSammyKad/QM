'use client';
interface BookingData {
  patientName: string;
  patientAge: number;
  patientGender: string;
  appointmentDate: string;
  appointmentTimeSlot: string;
  collectionAddress: string;
  collectionAddressDetail: string;
  testName: string;
  testDescription: string;
  testImage: string;
  eReportDate: string;
  cartMRP: number;
  otherServices: number;
  totalDiscount: number;
  totalAmount: number;
  finalAmount: number;
}

// components/BookingSummary.tsx

interface BookingSummaryProps {
  bookingData: BookingData;
  onContinue: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  bookingData,
  onContinue,
}) => {
  return (
    <div className="max-w-5xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {/* Patient Info */}
          <div className="flex items-start justify-between border-b pb-4 mb-4">
            <div className="flex items-center">
              <div className="text-gray-400 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600">{bookingData.patientName}</p>
                <p className="text-gray-400 text-sm">
                  Male,{bookingData.patientAge}
                </p>
              </div>
            </div>
            <button className="text-teal-500 hover:text-teal-600 text-sm">
              Change
            </button>
          </div>

          {/* Appointment Date */}
          <div className="flex items-start justify-between border-b pb-4 mb-4">
            <div className="flex items-center">
              <div className="text-gray-400 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600">
                  {bookingData.appointmentDate},{' '}
                  {bookingData.appointmentTimeSlot}
                </p>
                <p className="text-gray-400 text-sm">Sample collection slot</p>
              </div>
            </div>
            <button className="text-teal-500 hover:text-teal-600 text-sm">
              Change
            </button>
          </div>

          {/* Collection Address */}
          <div className="flex items-start justify-between border-b pb-4 mb-4">
            <div className="flex items-center">
              <div className="text-gray-400 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600">{bookingData.collectionAddress}</p>
                <p className="text-gray-400 text-sm">
                  Sample collection address
                </p>
              </div>
            </div>
            <button className="text-teal-500 hover:text-teal-600 text-sm">
              Change
            </button>
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

          {/* Prescription Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors">
              My Prescriptions
            </button>
            <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors">
              Add New Prescription
            </button>
          </div>

          <p className="text-orange-500 text-sm">Doesn't have prescription</p>

          {/* Other Details */}
          <div className="mt-8">
            <h3 className="text-gray-500 text-lg mb-3">Others details</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Quick meds is a technology platform to facilitate transaction of
              business. The products and services are offered for sale by the
              sellers. The user authorizes the delivery personnel to be his
              agent for delivery of the goods. For details read terms and
              conditions
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
                  src={bookingData.testImage}
                  alt="Test"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-gray-500">{bookingData.testDescription}</p>
                <p className="text-teal-500 mt-2">
                  E-report by {bookingData.eReportDate}
                </p>
              </div>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl text-gray-500 mb-4">Bill summary</h2>

            <div className="flex justify-between mb-3">
              <p className="text-gray-500">Cart MRP</p>
              <p className="text-gray-600">₹{bookingData.cartMRP}</p>
            </div>

            <div className="flex justify-between mb-3">
              <p className="text-gray-500">Other services</p>
              <p className="text-gray-600">₹{bookingData.otherServices}</p>
            </div>

            <div className="flex justify-between mb-3">
              <p className="text-gray-500">Total discount</p>
              <p className="text-green-600">-₹{bookingData.totalDiscount}</p>
            </div>

            <div className="border-t pt-3 flex justify-between font-medium">
              <p className="text-gray-500">To be paid</p>
              <p className="text-gray-600">₹{bookingData.totalAmount}</p>
            </div>

            {/* Final Amount and Continue Button */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">To be paid</p>
                <p className="text-2xl text-gray-500">
                  ₹{bookingData.finalAmount}
                </p>
              </div>
              <button
                onClick={onContinue}
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

export default function BookingSummaryPage() {
  // Dummy data matching your provided image
  const bookingData: BookingData = {
    patientName: 'Iron man',
    patientAge: 25,
    patientGender: 'Male',
    appointmentDate: '29 Feb 2024',
    appointmentTimeSlot: '12 PM - 1PM',
    collectionAddress: 'Office (Ashar it 402,thane)',
    collectionAddressDetail: 'Sample collection address',
    testName: 'Comprehensive gold full body checkup',
    testDescription: 'Comprehensive gold full body checkup with smart report',
    testImage: '/public/LabTestDummy.png', // Replace with your image URL
    eReportDate: 'Fri,01 Mar',
    cartMRP: 4398,
    otherServices: 19,
    totalDiscount: 2201,
    totalAmount: 2216,
    finalAmount: 2199,
  };

  const handleContinue = () => {
    console.log('Continue button clicked');
    // Add your continue logic here
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <BookingSummary bookingData={bookingData} onContinue={handleContinue} />
    </div>
  );
}
