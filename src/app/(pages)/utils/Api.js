// utils.js
export const Main = 'https://quickmeds.sndktech.online';

export const header = {
  'Content-Type': 'application/json',
  'x-authorization': 'RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph', // Authorization token
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2NzQ1Mzg1LCJleHAiOjE3NDgzMDI5ODV9.5wRlYbaliLtMW57h7YCASiJZsESXS1Ouo6i48zuIyTI',
};

const Api = {
  WishlistSearch: (query) => `${Main}/product.get?productName=${query}`,
  Wishlist: `${Main}/wishlist.get1`,

  TestPackage: `${Main}/testPackage.get`,
  MostBookedTests: `${Main}/labTest.mostBookedTests`,

  // LabTestExplorePackages: `${Main}/labTest.explorePackages`,

  PopularLabTests: `${Main}/labTest.popularTests`,
  LabTestAddToCart: `${Main}/labTestCart.add`,
  LabTestRemoveFromCart: (id) => `${Main}/labTestCart.delete/${id}`,
  LabTest: (id) => `${Main}/labTest.get/${id}`,
  LabTestCart: (id) => `${Main}/labTestCart.get.byUserId/${id}`,
  LabTestPatientsByUserID: (userId) => `${Main}/patient.getByUserId/${userId}`,
  LabTestGetSlotsDateByLabTestId: (id) =>
    `${Main}/slotsnew.get?LebtestId=${id}`,

  LabTestGetSlotsTimeByLabTestId: (id, date) =>
    `${Main}/slotsdate.get?LebtestId=${id}&${date}`,
  LabTestAddPatient: `${Main}/patient.add`,
  LabTestBooking: `${Main}/testBooking.add`,
  LabTestBookingSummary: (id) => `${Main}/testBooking/${id}`,
  LabTestTracking: (id) => `${Main}/testBooking/${id}`,
  LabTestBookingCancel: `${Main}/adminOrder/cancel`,
};

export default Api;
