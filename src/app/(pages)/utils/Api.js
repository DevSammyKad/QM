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
  PopularlabTest: `${Main}/labTest.popularTests`,
  TestPackage: `${Main}/testPackage.get`,
  MostBookedTests: `${Main}/labTest.mostBookedTests`,
};

export default Api;
