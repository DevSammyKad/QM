import LabTestBookingSummary from '@/src/page/lab-test-booking-summary/LabTestBookingSummary';

export default function Page({ params }: { params: { id: number } }) {
  return <LabTestBookingSummary BookingId={params.id} />;
}
// export default function BookingSummaryPage() {
//   // Dummy data matching your provided image
//   const bookingData: BookingData = {
//     patientName: 'Iron man',
//     patientAge: 25,
//     patientGender: 'Male',
//     appointmentDate: '29 Feb 2024',
//     appointmentTimeSlot: '12 PM - 1PM',
//     collectionAddress: 'Office (Ashar it 402,thane)',
//     collectionAddressDetail: 'Sample collection address',
//     testName: 'Comprehensive gold full body checkup',
//     testDescription: 'Comprehensive gold full body checkup with smart report',
//     testImage: '/LabTestDummy.png', // Replace with your image URL
//     eReportDate: 'Fri,01 Mar',
//     cartMRP: 4398,
//     otherServices: 19,
//     totalDiscount: 2201,
//     totalAmount: 2216,
//     finalAmount: 2199,
//   };

//   const handleContinue = () => {
//     console.log('Continue button clicked');
//     // Add your continue logic here
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       <BookingSummary bookingData={bookingData} onContinue={handleContinue} />
//     </div>
//   );
// }
