"use client";

import { useState } from "react";
import { dummyAddresses } from "@/dummyData";
import CrossSvg from "@/src/icons/crossSvg";
import LocationSvg from "@/src/icons/locationSvg";
import SelectAddress from "@/src/page/address/select-address";
import { OutLinedButton, PrimaryButton } from "@/src/ui/buttons/buttons";
import DialogWrapper from "@/src/ui/dialog-wrapper.tsx/dialog-wrapper";
import GlobalSearchBox from "@/src/ui/searchbox/global-search-box";

export default function Page() {
  const [openAddNewAddressPopUp, setOpenAddNewAddressPopUp] = useState(false);
  const [openConfirmDeliveryAreaPopUp, setOpenConfirmDeliveryAreaPopUp] =
    useState(false);
  const [openLocationManuallyPopUp, setOpenLocationManuallyPopUp] =
    useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // 📍 Fetch Current Location
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

  // 🔄 Convert Coordinates to Address using Google API
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
      <SelectAddress addresses={dummyAddresses} />

      <PrimaryButton
        type="submit"
        className="text-xl py-3 rounded-2xl mt-5 md:w-[400px]"
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
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231.59169118537966!2d72.12352631194742!3d21.76217750065059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f508c1cfd2705%3A0xeea538b2608c914a!2s19-A%2C%20R.T.O%20Rd%2C%20Adarsh%20Society%2C%20Vijayrajnagar%2C%20Bhavnagar%2C%20Gujarat%20364002!5e0!3m2!1sen!2sin!4v1741258767943!5m2!1sen!2sin" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
    </div>
  );
}
