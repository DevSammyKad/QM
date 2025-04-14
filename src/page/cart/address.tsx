"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Routes } from "@/routes.config";
import DeliverySvg from "@/src/icons/DeliverySvg";
import { OutLinedButton } from "@/src/ui/buttons/buttons";
import Link from "next/link";
import axios from "axios";

const API_URL = "https://quickmeds.sndktech.online";

export default function Address({
  small,
  selectedAddress: propSelectedAddress,
}: {
  small?: boolean;
  selectedAddress?: any;
}) {
  const [defaultAddress, setDefaultAddress] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const urlAddress = searchParams.get("address");
  const selectedAddressFromUrl = urlAddress
    ? JSON.parse(decodeURIComponent(urlAddress))
    : null;

  console.log("Address from URL:", selectedAddressFromUrl);
  console.log("Address from prop:", propSelectedAddress);

  useEffect(() => {
    const fetchAddress = async () => {
      const storedToken =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/address.get`, {
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.data.status && response.data.addresses?.length > 0) {
          setDefaultAddress(response.data.addresses[0]);
          console.log("Fetched defaultAddress:", response.data.addresses[0]);
        } else {
          setDefaultAddress(null);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setDefaultAddress(null);
      } finally {
        setLoading(false);
      }
    };

    if (!propSelectedAddress && !selectedAddressFromUrl) {
      fetchAddress();
    } else {
      setLoading(false);
    }
  }, [propSelectedAddress, selectedAddressFromUrl]);

  const displayAddress =
    selectedAddressFromUrl || propSelectedAddress || defaultAddress;

  console.log("Computed displayAddress:", displayAddress);

  return (
    <div className="w-full flex items-center gap-[5px] bg-transparent justify-between">
      <div className="flex flex-col">
        <div
          className={`flex items-center text-black gap-3 font-semibold ${
            small ? "text-sm" : ""
          }`}
        >
          <DeliverySvg />
          {loading
            ? "Fetching address..."
            : displayAddress
            ? `Delivering to ${displayAddress.name || "your address"}`
            : "No address found"}
        </div>
        <span
          className={`text-sm ${
            small ? "text-xs" : ""
          } max-sm:text-xs text-shade`}
        >
          {loading
            ? "Loading..."
            : displayAddress
            ? `${displayAddress.street}, ${displayAddress.city}, ${displayAddress.state}`
            : "Please add an address"}
        </span>
      </div>
      <Link href={Routes.myAddresses}>
        <OutLinedButton
          size="sm"
          className="min-h-fit min-w-fit w-fit h-fit p-0 px-3 py-2 border font-semibold text-xs"
        >
          Change
        </OutLinedButton>
      </Link>
    </div>
  );
}
