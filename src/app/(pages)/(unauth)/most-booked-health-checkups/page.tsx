"use client";
import { useEffect, useState } from "react";
import {
  dummyAges,
  dummyBrands,
  dummyProductsForms,
  dummyUses,
  selectOptions,
} from "@/dummyData";
import CustomCheckbox from "@/src/ui/checkbox/checkbox";
import CustomCheckboxGroup from "@/src/ui/checkbox/custom-checkbox-group";
import GlobalSearchBox from "@/src/ui/searchbox/global-search-box";
import CustomSelect from "@/src/ui/select/custom-select";
import { Divider } from "@nextui-org/divider";
import { SelectItem } from "@nextui-org/select";
import CheckupCard from "@/src/components/custom-cards/checkup-card/checkup-card";

export default function Page() {
  const [topSellingData, setTopSellingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellingData = async () => {
      try {
        const res = await fetch(
          "https://quickmeds.sndktech.online/labTest.mostBookedTests",
          {
            headers: {
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            },
          }
        );

        if (!res.ok) {
          console.error("Error Status:", res.status);
          const errorText = await res.text();
          throw new Error(
            `Failed to fetch data. Status Code: ${res.status}, Details: ${errorText}`
          );
        }

        const data = await res.json();
        console.log("Fetched Lab Tests Data:", data);

        if (data && Array.isArray(data.labTests)) {
          const mappedData = data.labTests.map((test) => ({
            id: test.labTestId,
            imgUrl: test.coverImage, // Using coverImage from response
            title: test.testName,
            sellingPrice: test.sellingPrice,
            actualPrice: test.mrp,
            isLiked: false, // Assuming no 'favorite' field in response
            offer: 70,
            // offer: ((test.mrp - test.sellingPrice) / test.mrp) * 100, // Calculating discount percentage
          }));
          setTopSellingData(mappedData);
        } else {
          setTopSellingData([]);
          console.error("labTests is not an array:", data.labTests);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingData();
  }, []);

  const randomData = topSellingData; // Use the fetched data for rendering

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-medium">What are you looking for?</p>
        <GlobalSearchBox placeholder="Search for health checkups and lab tests" />
      </div>
      <div className="grid pt-8 grid-cols-[225px_1fr] gap-8 items-start">
        <div className="rounded-xl max-lg:hidden flex flex-col overflow-hidden">
          <div className="bg-white p-2">
            <p className="text-xl font-medium">Filters</p>
          </div>
          <Divider />
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Brands</p>
            <CustomCheckboxGroup>
              {dummyBrands.map((brand) => (
                <CustomCheckbox value={brand.value} key={brand.value}>
                  {brand.label}
                </CustomCheckbox>
              ))}
            </CustomCheckboxGroup>
          </div>
          <Divider />
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Product form</p>
            <CustomCheckboxGroup>
              {dummyProductsForms.map((forms) => (
                <CustomCheckbox value={forms.value} key={forms.value}>
                  {forms.label}
                </CustomCheckbox>
              ))}
            </CustomCheckboxGroup>
          </div>
          <Divider />
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Uses</p>
            <CustomCheckboxGroup>
              {dummyUses.map((uses) => (
                <CustomCheckbox value={uses.value} key={uses.value}>
                  {uses.label}
                </CustomCheckbox>
              ))}
            </CustomCheckboxGroup>
          </div>
          <Divider />
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Age</p>
            <CustomCheckboxGroup>
              {dummyAges.map((ages) => (
                <CustomCheckbox value={ages.value} key={ages.value}>
                  {ages.label}
                </CustomCheckbox>
              ))}
            </CustomCheckboxGroup>
          </div>
        </div>
        <div className="w-full max-lg:col-span-2 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-shade text-lg">{randomData.length} results</p>
            <CustomSelect label="Sort By">
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </CustomSelect>
          </div>
          <div className="grid grid-cols-4 justify-items-center max-[1400px]:grid-cols-3 max-[1080px]:grid-cols-2 max-[450px]:grid-cols-1 gap-3">
            {randomData.map((data) => (
              <CheckupCard key={data.id} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
