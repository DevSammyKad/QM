'use client';
import {
  checkupCardData,
  dummyProductCardData,
  packageData,
} from '@/dummyData';
import { Routes } from '@/routes.config';
import CheckupCard from '@/src/components/custom-cards/checkup-card/checkup-card';
import Carousel from '@/src/components/custom-carousel/carousel';
import CarouselTitleBox from '@/src/components/custom-carousel/carousel-title-box';
import ImgTab from '@/src/components/imgTab/img-tab';
import SiteLayout from '@/src/layouts/site-layout';
import BannersLab from '@/src/page/lab-test-home/BannerLab';
import PackageTitleCarousel from '@/src/page/lab-test-home/PackageTitleCarousel';
import HeroLab from '@/src/page/lab-test-home/hero';
import { useCallback, useEffect, useState } from 'react';

import Api, { header } from '../../utils/Api';
import PopularLabTestCard from '@/src/components/PopularLabTestCard';
import { LabTestCarousel } from '@/src/components/custom-carousel/lab-test-carousel';

// Add these interfaces at the top of the file
interface LabTest {
  id: string | number;
  testName: string;
  sellingPrice: number;
  mrp: number;
  description?: string;
  coverImage?: string;
  // add other fields as needed
}

export default function page() {
  const bannerData = [
    '/media/bannerimgs/banner1.png',
    '/media/bannerimgs/banner2.png',
    '/media/bannerimgs/banner1.png',
    '/media/bannerimgs/banner2.png',
    '/media/bannerimgs/banner1.png',
    '/media/bannerimgs/banner2.png',
  ];
  const defaultImageUrl = 'placeholder.png';
  const [popularLabData, setPopularLabData] = useState<LabTest[]>([]);
  const [TestPackageData, setTestPackageData] = useState([]);
  const [mostBookedHealthCheckups, setMostBookedHealthCheckups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchPopularLabTests = useCallback(async () => {
    try {
      console.log('Fetching Popular Lab Tests from:', Api.PopularlabTest);

      const res = await fetch(Api.PopularlabTest, { headers: header });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Failed to fetch data, Status Code: ${res.status}, Details: ${errorText}`
        );
      }

      const data = await res.json();
      console.log('Fetched Popular Lab Tests:', data);

      if (data.status && Array.isArray(data.labTests)) {
        const formattedData = data.labTests.map((test: any) => ({
          id: test.id,
          testName: test.testName,
          sellingPrice: test.sellingPrice,
          mrp: test.mrp,
          description: test.description,
          bannerImage: test.bannerImage || '',
          coverImage: test.coverImage || '',
        }));
        setPopularLabData(formattedData);
      } else {
        throw new Error('Invalid response format from API');
      }
      console.log('Fetched Popular Lab Tests:', data);
    } catch (err: any) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopularLabTests();
  }, [fetchPopularLabTests]); // Empty dependency array means this will only run once after the component mounts

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
            // description: testPackage.description, // Assuming a description exists
            // price: testPackage.price, // Assuming 'price' exists in the package data
            // imgUrl: defaultImageUrl,
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

  const mapPopularLabData = popularLabData.map((test) => ({
    id: String(test.id),
    icon: test.coverImage || '/LabTestDummy.png',
    title: test.testName,
    testCount: 1, // You may replace this with actual count if available
    price: test.sellingPrice,
  }));

  const labTests = [
    {
      id: '1',
      icon: '/thyroid-icon.svg',
      title: 'Thyroid profile total(T3,T4& TSH)',
      testCount: 3,
      price: 299,
    },
    {
      id: '2',
      icon: '/glucose-icon.svg',
      title: 'Glucose, Post Prandial (PP), 2 Hours (Post Meal)',
      testCount: 3,
      price: 299,
    },
    {
      id: '3',
      icon: '/thyroid-icon.svg',
      title: 'Thyroid profile total(T3,T4& TSH)',
      testCount: 3,
      price: 299,
    },
    {
      id: '4',
      icon: '/glucose-icon.svg',
      title: 'Glucose, Post Prandial (PP), 2 Hours (Post Meal)',
      testCount: 3,
      price: 299,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-10 max-sm:gap-5 pb-5">
      <HeroLab />
      <BannersLab bannerData={bannerData} />

      <PackageTitleCarousel
        title="Doctor curated lab packages"
        packageData={packageData}
      />

      <div className="h-[450px] max-lg:px-0  mx-auto max-w-[1920px] flex items-center justify-between gap-5  px-5 bg-hero-pattern bg-no-repeat w-full">
        <ImgTab
          src="/media/popular-lab.png"
          className="h-full w-1/5 max-lg:hidden"
        />
        <div className="pl-0 md:pl-1/3">
          <LabTestCarousel
            title="Popular lab test"
            description="Qorem ipsum dolor sit amet, consectetur adipiscing elit."
            viewAllLink="/popular-lab-test"
            tests={mapPopularLabData}
          />
        </div>

        {/* <SiteLayout className="w-3/4 max-lg:w-full p-0">
          <CarouselTitleBox
            link={Routes.popularLabTest}
            title="Popular lab test"
            titleDescription="Qorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <Carousel
              renderProp={() =>
                popularLabData
                  .slice(0, 5)
                  .map((labTest) => (
                    <PopularLabTestCard key={labTest.id} data={labTest} />
                  ))
              }
              slideDataLength={popularLabData.length}
            />
          </CarouselTitleBox>
        </SiteLayout> */}
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
      <BannersLab bannerData={bannerData} />

      <PackageTitleCarousel
        title="Explore packages"
        packageData={TestPackageData}
      />
      <PackageTitleCarousel
        title="Find tests by organ"
        packageData={packageData}
      />
    </div>
  );
}
