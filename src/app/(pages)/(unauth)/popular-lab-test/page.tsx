'use client';
import { useEffect, useState } from 'react';
import {
  dummyAges,
  dummyBrands,
  dummyProductCardData,
  dummyProductsForms,
  dummyUses,
  selectOptions,
} from '@/dummyData';
import ProductCard from '@/src/components/custom-cards/productCard/productCard';
import CustomCheckbox from '@/src/ui/checkbox/checkbox';
import CustomCheckboxGroup from '@/src/ui/checkbox/custom-checkbox-group';
import GlobalSearchBox from '@/src/ui/searchbox/global-search-box';
import CustomSelect from '@/src/ui/select/custom-select';
import { Divider } from '@nextui-org/divider';
import { SelectItem } from '@nextui-org/select';
import Api from '../../utils/Api';

export default function page() {
  // const randomData = dummyProductCardData;

  const [mostPopularLabData, setMostPopularLabData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMostPopularLabTest = async () => {
      try {
        // Fetch the lab test data
        const res = await fetch(Api.PopularlabTest, {
          headers: {
            'x-authorization': 'RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph', // Authorization token
          },
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

  // const randomData = topSellingData; // Use the fetched data for rendering
  const randomData = mostPopularLabData;

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-medium">What are you looking for?</p>
        <GlobalSearchBox placeholder="Search for medicine and health products" />
      </div>
      <div className="grid pt-8 grid-cols-[225px_1fr] gap-8 items-start">
        <div className="rounded-xl max-lg:hidden flex flex-col overflow-hidden">
          <div className="bg-white  p-2">
            <p className="text-xl font-medium">Filters</p>
          </div>
          <Divider />
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Brands</p>
            <div className="">
              <CustomCheckboxGroup>
                {dummyBrands.map((brand) => (
                  <CustomCheckbox value={brand.value} key={brand.value}>
                    {brand.label}
                  </CustomCheckbox>
                ))}
              </CustomCheckboxGroup>
            </div>
          </div>
          <Divider />
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Product form</p>
            <div className="">
              <CustomCheckboxGroup>
                {dummyProductsForms.map((forms) => (
                  <CustomCheckbox value={forms.value} key={forms.value}>
                    {forms.label}
                  </CustomCheckbox>
                ))}
              </CustomCheckboxGroup>
            </div>
          </div>
          <Divider />
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Uses</p>
            <div className="">
              <CustomCheckboxGroup>
                {dummyUses.map((uses) => (
                  <CustomCheckbox value={uses.value} key={uses.value}>
                    {uses.label}
                  </CustomCheckbox>
                ))}
              </CustomCheckboxGroup>
            </div>
          </div>
          <Divider />
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Age</p>
            <div className="">
              <CustomCheckboxGroup>
                {dummyAges.map((ages) => (
                  <CustomCheckbox value={ages.value} key={ages.value}>
                    {ages.label}
                  </CustomCheckbox>
                ))}
              </CustomCheckboxGroup>
            </div>
          </div>
        </div>
        <div className="w-full max-lg:col-span-2 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-shade  text-lg"> {randomData.length} results</p>
            <CustomSelect label="Sort By">
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </CustomSelect>{' '}
          </div>
          <div className="grid grid-cols-4 justify-items-center max-[1400px]:grid-cols-3 max-[1080px]:grid-cols-2 max-[450px]:grid-cols-1 gap-3 ">
            {randomData.map((data) => (
              <ProductCard key={data.id} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
