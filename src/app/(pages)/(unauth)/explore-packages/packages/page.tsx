"use client";
import {
  checkupCardData,
  dummyPackagesCategories,
  selectOptions,
} from "@/dummyData";
import CheckupCard from "@/src/components/custom-cards/checkup-card/checkup-card";
import CustomCheckbox from "@/src/ui/checkbox/checkbox";
import CustomCheckboxGroup from "@/src/ui/checkbox/custom-checkbox-group";
import GlobalSearchBox from "@/src/ui/searchbox/global-search-box";
import CustomSelect from "@/src/ui/select/custom-select";
import { Divider } from "@nextui-org/divider";
import { SelectItem } from "@nextui-org/select";
import { useState, useEffect } from "react";

export default function page() {
  const randomData = checkupCardData;

  const [TestPackageData, setTestPackageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestPackageData = async () => {
      try {
        // Fetch the test package data
        const res = await fetch(
          "https://quickmeds.sndktech.online/testPackage.get",
          {
            headers: {
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Authorization token
            },
          }
        );

        if (!res.ok) {
          // Handle HTTP errors
          console.log("Error Status:", res.status);
          const errorText = await res.text(); // Read error body if available
          console.error("Error Details:", errorText);
          throw new Error(`Failed to fetch data, Status Code: ${res.status}`);
        }

        // Parsing the response JSON
        const data = await res.json();
        console.log("Fetched Test Package Data:", data); // Check what the data looks like

        // Handle missing or unexpected data formats
        if (data && Array.isArray(data.testPackages)) {
          const mappedData = data.testPackages.map((testPackage: any) => ({
            id: testPackage.id,
            title: testPackage.name, // Assuming 'name' is the package title
            description: testPackage.description, // Assuming a description exists
            price: testPackage.price, // Assuming 'price' exists in the package data
            // Add any other necessary fields you need
          }));

          setTestPackageData(mappedData); // Set the fetched data
        } else {
          console.error(
            "Packages is not an array or missing:",
            data.testPackages
          );
          setTestPackageData([]); // Set empty array if data is not in the expected format
        }
      } catch (err) {
        console.error("Fetch Error:", err); // Log the error to understand the issue
        setError(err.message); // Update state with error message
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchTestPackageData();
  }, []); // Empty dependency array means this will only run once after the component mounts

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-medium">What are you looking for?</p>
        <GlobalSearchBox placeholder="Search for medicine and health products" />
      </div>
      <div className="grid pt-8   grid-cols-[225px_1fr]  gap-8 items-start">
        <div className="rounded-xl max-lg:hidden flex flex-col">
          <div className="bg-white  p-2">
            <p className="text-xl font-medium">Filter</p>
          </div>
          <Divider />
          <div className="bg-white flex flex-col gap-2 py-5 px-2 ">
            <CustomCheckboxGroup className="" classNames={{ wrapper: "gap-5" }}>
              {dummyPackagesCategories.map((category) => (
                <CustomCheckbox value={category.value} key={category.value}>
                  {category.label}
                </CustomCheckbox>
              ))}
            </CustomCheckboxGroup>
          </div>
        </div>
        <div className="w-full max-lg:col-span-2 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-shade  text-lg">
              {" "}
              {TestPackageData.length} results
            </p>
            <CustomSelect label="Sort By">
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </CustomSelect>
          </div>
          <div className="grid grid-cols-4 max-[1700px]:grid-cols-3 justify-items-center max-[1300px]:grid-cols-2  max-[450px]:grid-cols-1 gap-3 ">
            {TestPackageData.map((testPackage) => (
              <CheckupCard key={testPackage.id} data={testPackage} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
