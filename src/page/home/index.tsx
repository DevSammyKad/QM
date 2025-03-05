'use client';
import {
  checkupCardData,
  dummyProductCardData,
  packageData,
} from '@/dummyData';
import { useEffect, useState } from 'react';
import { Routes } from '@/routes.config';
import CheckupCard from '@/src/components/custom-cards/checkup-card/checkup-card';
import PackageCard from '@/src/components/custom-cards/package-card/package-card';
import ProductCard from '@/src/components/custom-cards/productCard/productCard';
import Carousel from '@/src/components/custom-carousel/carousel';
import CarouselTitleBox from '@/src/components/custom-carousel/carousel-title-box';
import ImgTab from '@/src/components/imgTab/img-tab';
import SiteLayout from '@/src/layouts/site-layout';
import Banners from './banners';
import Hero from './hero';
import Api from '../utils/Api';
import { header } from '../utils/Api';
import { headers } from 'next/headers';
import PopularLabTest from '@/src/components/PopularLabTest';
import DonateBanner from './DonateBanner';

const defaultImageUrl = 'placeholder.png';
export default function HomePage() {
  const randomData = dummyProductCardData;

  const [mostPopularData, setMostPopularData] = useState([]); // Default as empty array
  const [mostPopularLabData, setMostPopularLabData] = useState([]);
  const [TestPackageData, setTestPackageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topSellingData, setTopSellingData] = useState([]);
  const [mostBookedHealthCheckups, setMostBookedHealthCheckups] = useState([]);

  useEffect(() => {
    const fetchTopSellingData = async () => {
      try {
        const res = await fetch(Api.TopSellingProduct, {
          headers: header,
        });

        if (!res.ok) {
          console.error('Error Status:', res.status);
          const errorText = await res.text();
          throw new Error(
            `Failed to fetch data. Status Code: ${res.status}, Details: ${errorText}`
          );
        }

        const data = await res.json();
        console.log('Fetched Top Selling Data:', data);

        if (data && Array.isArray(data.products)) {
          const mappedData = data.products.map((product: any) => ({
            id: product.id,
            // imgUrl: JSON.parse(product.images)[0], // Extract first image URL safely
            title: product.productName,
            sellingPrice: product.sellingPrice,
            actualPrice: product.mrp,
            isLiked: product.favorite,
            offer: product.discount,
            imgUrl: defaultImageUrl,
          }));
          setTopSellingData(mappedData);
        } else {
          setTopSellingData([]);
          console.error('Products is not an array:', data.products);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopSellingData();
  }, []);

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchMostPopularData = async () => {
      try {
        const res = await fetch(Api.MostPopular, {
          headers: header,
        });

        if (!res.ok) {
          console.log('Error Status:', res.status);
          const errorText = await res.text(); // Read error body if available
          console.error('Error Details:', errorText);
          throw new Error(`Failed to fetch data, Status Code: ${res.status}`);
        }

        const data = await res.json();
        console.log('Fetched Data:', data); // Check what the data looks like
        // const defaultImageUrl = "placeholder.png";
        // Ensure products is an array before setting it to state
        if (data && Array.isArray(data.products)) {
          const mappedData = data.products.map((product: any) => ({
            id: product.id,
            // imgUrl: product.images && JSON.parse(product.images).length > 0
            //   ? JSON.parse(product.images)[0] // Use first image if available
            //   : defaultImageUrl, // Use default if no valid images
            title: product.productName,
            sellingPrice: product.sellingPrice,
            actualPrice: product.mrp,
            isLiked: product.favorite,
            offer: product.discount,
            imgUrl: defaultImageUrl,
          }));

          setMostPopularData(mappedData);
        } else {
          setMostPopularData([]); // Set empty array if products is not an array
          console.error('Products is not an array:', data.products);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMostPopularData();
  }, []); // Empty dependency array means this runs only once after the component mounts

  useEffect(() => {
    const fetchMostPopularLabTest = async () => {
      try {
        // Fetch the lab test data
        const res = await fetch(Api.PopularlabTest, {
          headers: header,
        });

        if (!res.ok) {
          // Handle HTTP errors
          console.log('Error Status:', res.status);
          const errorText = await res.text(); // Read error body if available
          console.error('Error Details:', errorText);
          throw new Error(`Failed to fetch data, Status Code: ${res.status}`);
        }

        // Parsing the response JSON
        const data = await res.json();
        console.log('Fetched Lab Test Data:', data); // Check what the data looks like

        // Handle missing or unexpected data formats
        if (data && Array.isArray(data.labTests)) {
          const mappedData = data.labTests.map((labTest: any) => ({
            id: labTest.id,
            title: labTest.testName, // Assuming a 'name' property exists, adjust according to actual data
            description: labTest.description, // Assuming description exists
            sellingPrice: labTest.sellingPrice, // Adjust with the correct property
            actualPrice: labTest.mrp,
            isLiked: labTest.favorite,
            offer: labTest.discount,
            imgUrl: defaultImageUrl,
            // Add any other necessary fields
          }));

          setMostPopularLabData(mappedData); // Set the fetched data
        } else {
          console.error('Products is not an array or missing:', data.labTests);
          setMostPopularLabData([]); // Set empty array if data is not in the expected format
        }
      } catch (err) {
        console.error('Fetch Error:', err); // Log the error to understand the issue
        setError(err.message); // Update state with error message
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchMostPopularLabTest();
  }, []); // Empty dependency array means this will only run once after the component mounts

  useEffect(() => {
    const fetchTestPackageData = async () => {
      try {
        // Fetch the test package data
        const res = await fetch(Api.TestPackage, {
          headers: header,
        });

        if (!res.ok) {
          // Handle HTTP errors
          console.log('Error Status:', res.status);
          const errorText = await res.text(); // Read error body if available
          console.error('Error Details:', errorText);
          throw new Error(`Failed to fetch data, Status Code: ${res.status}`);
        }

        // Parsing the response JSON
        const data = await res.json();
        console.log('Fetched Test Package Data:', data); // Check what the data looks like

        // Handle missing or unexpected data formats
        if (data && Array.isArray(data.testPackages)) {
          const mappedData = data.testPackages.map((testPackage: any) => ({
            id: testPackage.id,
            title: testPackage.name, // Assuming 'name' is the package title
            // imgUrl: defaultImageUrl,
            // description: testPackage.description, // Assuming a description exists
            // price: testPackage.price, // Assuming 'price' exists in the package data
            // Add any other necessary fields you need
          }));

          setTestPackageData(mappedData); // Set the fetched data
        } else {
          console.error(
            'Packages is not an array or missing:',
            data.testPackages
          );
          setTestPackageData([]); // Set empty array if data is not in the expected format
        }
      } catch (err) {
        console.error('Fetch Error:', err); // Log the error to understand the issue
        setError(err.message); // Update state with error message
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchTestPackageData();
  }, []); // Empty dependency array means this will only run once after the component mounts

  useEffect(() => {
    const fetchMostBookedHealthCheckups = async () => {
      try {
        console.log(
          'Fetching Most Booked Health Checkups from:',
          'https://quickmeds.sndktech.online/labTest.mostBookedTests'
        );

        // Fetch the test package data
        const res = await fetch(Api.MostBookedTests, {
          headers: header,
        });

        if (!res.ok) {
          // If the fetch response is not okay, log error and throw an error
          console.error('Error Status:', res.status);
          const errorText = await res.text(); // Read error body if available
          throw new Error(
            `Failed to fetch data. Status Code: ${res.status}, Details: ${errorText}`
          );
        }

        // Parse the response data
        const data = await res.json();
        console.log('Fetched Most Booked Health Checkups Data:', data);

        // Ensure labTests is an array before setting it to state
        if (data && Array.isArray(data.labTests)) {
          const mappedData = data.labTests.map((test: any) => ({
            id: test.labTestId, // Adjust property name based on actual data structure
            title: test.testName, // Adjust property name based on actual data structure
            sellingPrice: test.sellingPrice,
            actualPrice: test.mrp,
            description: test.description,
            bookingCount: test.bookingCount,
            imgUrl: defaultImageUrl,
          }));

          setMostBookedHealthCheckups(mappedData); // Update the state with the fetched data
        } else {
          // If the fetched data is not an array or missing, set empty array and log error
          setMostBookedHealthCheckups([]);
          console.error('labTests is not an array or missing:', data.labTests);
        }
      } catch (err) {
        // Log any fetch or error handling issues
        console.error('Fetch Error:', err);
        setError(err.message); // Update the state with error message
      } finally {
        // Set loading to false when fetch is complete (either successful or failed)
        setLoading(false);
      }
    };

    fetchMostBookedHealthCheckups(); // Call the function to fetch data
  }, []); // Empty dependency array to ensure this runs only once when the component mounts

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-10 max-sm:gap-5 pb-5">
      <div className="w-full">
        <Hero />
        <DonateBanner />
        <Banners />
      </div>
      <SiteLayout className="p-0">
        <CarouselTitleBox link={Routes.topSelling} title="Top Selling">
          <Carousel
            renderProp={() => {
              return topSellingData.map((data) => (
                <ProductCard forCarousel key={data.id} data={data} />
              ));
            }}
            slideDataLength={topSellingData.length}
          />
        </CarouselTitleBox>
      </SiteLayout>
      <div className="h-[450px] max-lg:px-0  mx-auto max-w-[1920px] flex items-center justify-between gap-5  px-5 bg-hero-pattern bg-no-repeat w-full">
        <ImgTab
          src="/media/popular-lab.png"
          className="h-full w-1/5 max-lg:hidden"
        />
        <SiteLayout className="w-3/4 max-lg:w-full p-0">
          <CarouselTitleBox
            link={Routes.popularLabTest}
            title="Popular lab test"
            titleDescription="Qorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <Carousel
              renderProp={() => {
                return <PopularLabTest />;
              }}
              slideDataLength={mostPopularLabData.length}
            />
          </CarouselTitleBox>
        </SiteLayout>
      </div>
      <div className="h-[450px]  mx-auto max-w-[1920px] flex items-center justify-between gap-5  px-5 max-lg:px-0 bg-hero-pattern bg-no-repeat w-full">
        <SiteLayout className="w-3/4 max-lg:w-full p-0">
          <CarouselTitleBox
            link={Routes.mostBookedHealthCheckups}
            title="Most Booked Health Checkups"
            titleDescription="Qorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <Carousel
              renderProp={() => {
                return mostBookedHealthCheckups.map((data) => (
                  <CheckupCard forCarousel key={data.id} data={data} />
                ));
              }}
              slideDataLength={mostBookedHealthCheckups.length}
            />
          </CarouselTitleBox>
        </SiteLayout>
        <ImgTab
          src="/media/lab-test-2.png"
          className="h-full max-lg:hidden w-1/5"
        />
      </div>

      <div className="w-full flex flex-col gap-20 max-lg:gap-10">
        <SiteLayout className="p-0">
          <CarouselTitleBox
            link={Routes.explorePackages}
            title="Explore packages"
            titleDescription="Qorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <Carousel
              renderProp={() => {
                return TestPackageData.map((data) => (
                  <PackageCard forCarousel key={data.id} data={data} />
                ));
              }}
              slideDataLength={TestPackageData.length}
            />
          </CarouselTitleBox>
        </SiteLayout>
        <SiteLayout className="p-0">
          <CarouselTitleBox link={Routes.mostPopular} title="Most Popular">
            <Carousel
              renderProp={() => {
                return mostPopularData.map((data) => (
                  <ProductCard forCarousel key={data.id} data={data} />
                ));
              }}
              slideDataLength={mostPopularData.length}
            />
          </CarouselTitleBox>
        </SiteLayout>
      </div>
    </div>
  );
}
