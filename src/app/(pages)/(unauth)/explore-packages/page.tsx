"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { packageData } from "@/dummyData";
import PackageCard from "@/src/components/custom-cards/package-card/package-card";
import GlobalSearchBox from "@/src/ui/searchbox/global-search-box";

export default function page() {
  const [packageData, setPackageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://quickmeds.sndktech.online/testPackage.get",
          {
            headers: {
              "X-Authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            },
          }
        );
        if (response.data.status) {
          setPackageData(response.data.testPackages || []);
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-medium">Search your Wishlist products</p>
        <GlobalSearchBox placeholder="Search" />
      </div>
      <div className="pt-10 ">
        <p className="text-2xl font-medium pb-3">
          All health package categories in Thane, Maharashtra
        </p>
        <div className="justify-items-center grid max-md:px-2 grid-cols-4 gap-5 max-[1400px]:grid-cols-3  max-lg:grid-cols-2 max-sm:grid-cols-1  ">
          {packageData.map((data) => (
            <PackageCard data={data} key={data.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
