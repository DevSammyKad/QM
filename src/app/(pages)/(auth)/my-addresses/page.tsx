"use client";

import { useState } from "react";
import { dummyAddresses } from "@/dummyData";
import CrossSvg from "@/src/icons/crossSvg";
import LocationSvg from "@/src/icons/locationSvg";
import Address from "@/src/page/cart/address";
import SelectAddress from "@/src/page/address/select-address";
import { OutLinedButton, PrimaryButton } from "@/src/ui/buttons/buttons";
import DialogWrapper from "@/src/ui/dialog-wrapper.tsx/dialog-wrapper";
import GlobalSearchBox from "@/src/ui/searchbox/global-search-box";
import { useRouter } from "next/navigation";

export default function Page() {
  const [openAddNewAddressPopUp, setOpenAddNewAddressPopUp] = useState(false);
  const [openConfirmDeliveryAreaPopUp, setOpenConfirmDeliveryAreaPopUp] =
    useState(false);
  const [openLocationManuallyPopUp, setOpenLocationManuallyPopUp] =
    useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const router = useRouter();

  const handleAddressSelection = (address: any) => {
    console.log("Address selected in Parent:", address);
    setSelectedAddress(address);
  };

  const handleContinue = async () => {
    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }

    try {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        alert("User is not authenticated.");
        return;
      }

      // Update the selected address via API
      const response = await fetch(
        "https://quickmeds.sndktech.online/address.update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(selectedAddress),
        }
      );

      const data = await response.json();

      if (data.status) {
        // Instead of fetching all addresses again, use the selectedAddress directly
        console.log("Updated address:", selectedAddress);
        setSelectedAddress(selectedAddress); // Ensure state is updated (though not strictly necessary here)
        router.push(
          `/cart?address=${encodeURIComponent(JSON.stringify(selectedAddress))}`
        );
      } else {
        alert("Failed to update address: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert("An error occurred while updating the address.");
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          const address = await getAddressFromCoords(latitude, longitude);
          setCurrentLocation(address);
          setOpenConfirmDeliveryAreaPopUp(true);
          setOpenAddNewAddressPopUp(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to fetch location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAN2H3mnB8KIdj4HHd5W7AX9U_rGPLx9PY`
      );
      const data = await response.json();
      return data.results[0]?.formatted_address || "Location not found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error retrieving address";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p
        onClick={() => setOpenAddNewAddressPopUp(true)}
        className="text-secondary-500 font-semibold cursor-pointer hover:opacity-70 active:opacity-50 transition-all"
      >
        + Add new address
      </p>
      <p className="text-shade font-medium">Recent addresses</p>
      {/* <Address selectedAddress={selectedAddress} /> */}
      <SelectAddress
        addresses={dummyAddresses}
        onSelectAddress={handleAddressSelection}
      />

      <PrimaryButton
        type="submit"
        className="text-xl py-3 rounded-2xl mt-5 md:w-[400px]"
        onClick={handleContinue}
      >
        Continue
      </PrimaryButton>

      {/* Add New Address Popup */}
      <DialogWrapper
        open={openAddNewAddressPopUp}
        onClose={() => setOpenAddNewAddressPopUp(false)}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <img
            src="/AddressPopup.png"
            alt="Address Popup"
            className="object-cover w-[400px] rounded-lg"
          />
          <div className="flex items-center justify-center flex-col gap-2">
            <PrimaryButton
              onClick={getCurrentLocation}
              type="button"
              className="text-xl py-3 rounded-2xl"
            >
              Use my current location
            </PrimaryButton>
            <OutLinedButton
              onClick={() => {
                setOpenLocationManuallyPopUp(true);
                setOpenAddNewAddressPopUp(false);
              }}
              type="button"
              className="text-xl py-3 rounded-2xl"
            >
              Enter location manually
            </OutLinedButton>
          </div>
        </div>
      </DialogWrapper>

      {/* Confirm Delivery Area Popup (With Map) */}
      <DialogWrapper
        open={openConfirmDeliveryAreaPopUp}
        onClose={() => setOpenConfirmDeliveryAreaPopUp(false)}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
        title="Confirm Delivery Area"
      >
        <div className="flex flex-col justify-center items-center gap-5">
          {latitude && longitude ? (
            <iframe
              width="100%"
              height="400px"
              className="rounded-lg"
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAN2H3mnB8KIdj4HHd5W7AX9U_rGPLx9PY&q=${latitude},${longitude}&zoom=15`}
            />
          ) : (
            <p>Fetching location...</p>
          )}
          <div className="text-center text-lg font-semibold">
            {currentLocation || "Fetching location..."}
          </div>
          <PrimaryButton type="button" className="text-xl py-3 rounded-2xl">
            Confirm location and continue
          </PrimaryButton>
        </div>
      </DialogWrapper>

      {/* Enter Location Manually Popup */}
      <DialogWrapper
        open={openLocationManuallyPopUp}
        onClose={() => setOpenLocationManuallyPopUp(false)}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
        title="Search address area"
      >
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col justify-center my-5 w-full">
            <GlobalSearchBox placeholder="Search" className="w-full" />
            <p className="my-4 text-gray-500">
              Your delivery area can be a building name, locality, landmark,
              street name, etc.
            </p>
          </div>
          <div className="flex w-full justify-center flex-col gap-2">
            {locationData.map((location, index) => (
              <div key={index} className="flex gap-3 items-center">
                <LocationSvg />
                <div>
                  <h1 className="text-xl font-semibold">{location.city}</h1>
                  <p>
                    {location.state}, {location.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogWrapper>
    </div>
  );
}

const locationData = [
  { city: "Thane", state: "Maharashtra", country: "India" },
  { city: "Pune", state: "Maharashtra", country: "India" },
  { city: "Nanded", state: "Maharashtra", country: "India" },
];
