// utils.js
// export const Main = "http://192.168.1.25:3005";
export const Main = "https://quickmeds.sndktech.online";
export const header = {
  "Content-Type": "application/json",
  "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Authorization token
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2NzQ1Mzg1LCJleHAiOjE3NDgzMDI5ODV9.5wRlYbaliLtMW57h7YCASiJZsESXS1Ouo6i48zuIyTI",
};

const Api = {
  MostPopular: `${Main}/product.mostPopular`,
  PopularlabTest: `${Main}/labTest.popularTests`,
  TestPackage: `${Main}/testPackage.get`,
  Medicine: `${Main}/product.medicine`,
  Health: `${Main}/product.health`,
  Banner: `${Main}/bannerList1.get`,
  Priscription: `${Main}/priscription.add`,
  PriscriptionGet: `${Main}/priscription.getAll`,
  Login: `${Main}/users.sendOtp`,
  FAQ: `${Main}/faq`,
  VerifyOtp: `${Main}/users.verifyOtp`,
  ProductCartData: `${Main}/productCart.getAll.cartData`,
  AddToCart: `${Main}/productCart.add`,
  WishlistToggle: `${Main}/wishlist.toggle`,
  MostBookedTests: `${Main}/labTest.mostBookedTests`,
  TopSellingProduct: `${Main}/product.topSellingProducts`,
  WishlistSearch: (query) => `${Main}/product.get?productName=${query}`,
  TopSellingProductSearch: (query) =>
    `${Main}/product.topSellingProducts?productName=${query}`,
};

export default Api;
