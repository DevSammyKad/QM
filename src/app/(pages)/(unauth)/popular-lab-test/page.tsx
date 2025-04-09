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
import { header } from '@/src/page/utils/Api';
import LabTestCard from '@/src/components/LabTestCard';

export default function page() {
  const [labTestsData, setLabTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        setLoading(true);
        // Fetch the lab test data
        const res = await fetch(Api.PopularLabTests, {
          headers: header,
        });

        if (!res.ok) {
          console.log('Error Status:', res.status);
          const errorText = await res.text();
          console.error('Error Details:', errorText);
          throw new Error(`Failed to fetch data, Status Code: ${res.status}`);
        }

        const data = await res.json();
        console.log('Fetched Lab Test Data:', data);

        // Use the data directly as it matches our component requirements
        if (data && data.status && Array.isArray(data.labTests)) {
          setLabTestsData(data.labTests);
        } else {
          console.error('Lab tests data is not in expected format:', data);
          setLabTestsData([]);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLabTests();
  }, []);

  const handleBooking = (testId: number) => {
    console.log(`Booking test with ID: ${testId}`);
    // Add your booking logic here - e.g., redirect to booking page or open modal
  };

  // Fallback data in case API fails - structured like the backend response
  const fallbackTests = [
    {
      id: 1,
      testName: 'Comprehensive gold full body checkup with smart report',
      coverImage: '/public/LabRepresentative.png',
      mrp: 4398,
      sellingPrice: 1999,
      discount: '55',
      description:
        'A comprehensive health checkup package to assess your overall health status',
      favorite: false,
    },
  ];

  // Use fetched data if available, otherwise use fallback
  const displayData = labTestsData.length > 0 ? labTestsData : fallbackTests;

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
            <p className="text-shade  text-lg"> {displayData.length} results</p>
            <CustomSelect label="Sort By">
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </CustomSelect>{' '}
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading lab tests...</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 justify-items-center max-[1400px]:grid-cols-3 max-[1080px]:grid-cols-2 max-[450px]:grid-cols-1 gap-3">
              {displayData.map((test) => (
                <LabTestCard
                  key={test.id}
                  id={test.id}
                  testName={test.testName}
                  coverImage={test.coverImage}
                  mrp={test.mrp}
                  sellingPrice={test.sellingPrice}
                  discount={test.discount}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
