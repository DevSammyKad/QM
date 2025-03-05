'use client';

import { dummyAddresses } from '@/dummyData';
import CrossSvg from '@/src/icons/crossSvg';
import LocationSvg from '@/src/icons/locationSvg';
import SelectAddress from '@/src/page/address/select-address';
import { OutLinedButton, PrimaryButton } from '@/src/ui/buttons/buttons';
import DialogWrapper from '@/src/ui/dialog-wrapper.tsx/dialog-wrapper';
import GlobalSearchBox from '@/src/ui/searchbox/global-search-box';
import { useState } from 'react';

export default function page() {
  const [openAddNewAddressPopUp, setOpenAddNewAddressPopUp] =
    useState<boolean>(false);
  const openAddNewAddressPopUpHandler = () => {
    setOpenAddNewAddressPopUp(true);
  };
  const closeAddNewAddressPopUpHandler = () => {
    setOpenAddNewAddressPopUp(false);
  };

  const [openConfirmDeliveryAreaPopUp, setOpenConfirmDeliveryAreaPopUp] =
    useState<boolean>(false);
  const openConfirmDeliveryAreaPopUpHandler = () => {
    setOpenConfirmDeliveryAreaPopUp(true);
    setOpenAddNewAddressPopUp(false);
  };
  const closeConfirmDeliveryAreaPopUpHandler = () => {
    setOpenConfirmDeliveryAreaPopUp(false);
  };

  const [openLocationManuallyPopUp, setOpenLocationManuallyPopUp] =
    useState<boolean>(false);
  const openLocationManuallyHandler = () => {
    setOpenLocationManuallyPopUp(true);
    setOpenAddNewAddressPopUp(false);
  };
  const closeLocationManuallyHandler = () => {
    setOpenLocationManuallyPopUp(false);
  };

  const addresses = dummyAddresses;
  return (
    <div className="flex flex-col gap-2">
      <p
        onClick={openAddNewAddressPopUpHandler}
        className="text-secondary-500 font-semibold cursor-pointer hover:opacity-70 active:opacity-50  transition-all"
      >
        + Add new address
      </p>
      <p className="text-shade font-medium">Recent addresses</p>
      <SelectAddress addresses={addresses} />
      <PrimaryButton
        type="submit"
        className="text-xl py-3 rounded-2xl mt-5 md:w-[400px] "
        //   disabled={loading} // Disable the button if loading
      >
        {/* {loading ? 'Sending...' : 'Log in'}
         */}
        Continue
      </PrimaryButton>

      <DialogWrapper
        open={openAddNewAddressPopUp}
        onClose={closeAddNewAddressPopUpHandler}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex items-center justify-center">
            <img
              src="/AddressPopup.png"
              alt="Address Popup"
              className="object-cover w-[400px]  rounded-lg "
            />
          </div>
          <div className="flex items-center justify-center flex-col gap-2">
            <PrimaryButton
              onClick={openConfirmDeliveryAreaPopUpHandler}
              type="button"
              className="text-xl py-3 rounded-2xl"
              //   disabled={loading} // Disable the button if loading
            >
              {/* {loading ? 'Sending...' : 'Log in'}
               */}
              Use my current location
            </PrimaryButton>

            <OutLinedButton
              onClick={openLocationManuallyHandler}
              type="button"
              className="text-xl py-3 rounded-2xl"
              //   disabled={loading} // Disable the button if loading
            >
              {/* {loading ? 'Sending...' : 'Log in'}
               */}
              Enter location manually
            </OutLinedButton>
          </div>
        </div>
      </DialogWrapper>

      <DialogWrapper
        open={openConfirmDeliveryAreaPopUp}
        onClose={closeConfirmDeliveryAreaPopUpHandler}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
        title="Confirm Delivery Area"
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex items-center justify-center">
            <img
              src="/ConfirmDeliveryArea.png"
              alt="Expert Advice"
              className="object-cover w-[400px]  rounded-lg "
            />
          </div>
          <div className="flex items-center justify-center flex-col gap-2">
            <PrimaryButton
              type="button"
              className="text-xl py-3 rounded-2xl"
              //   disabled={loading} // Disable the button if loading
            >
              {/* {loading ? 'Sending...' : 'Log in'}
               */}
              Confirm location and continue
            </PrimaryButton>
          </div>
        </div>
      </DialogWrapper>
      <DialogWrapper
        open={openLocationManuallyPopUp}
        onClose={closeLocationManuallyHandler}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
        title="Search address area"
      >
        <div className="flex flex-col  items-center gap-5">
          <div className="flex flex-col  justify-center my-5 w-full">
            <GlobalSearchBox placeholder="Search" className="w-full" />

            <p className="my-4 text-gray-500">
              Your delivery area can be a building name, locality, landmark,
              street name, ect
            </p>
          </div>
          <div className="flex w-full justify-center flex-col gap-2">
            {locationData.map((location) => (
              <div className="flex gap-3 items-center">
                <LocationSvg />
                <div>
                  <h1 className="text-xl font-semibold">{location.city}</h1>
                  <p>
                    {location.state} , {location.country}
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
  {
    city: 'Thane',
    state: 'maharashtra',
    country: 'india',
  },
  {
    city: 'Pune',
    state: 'maharashtra',
    country: 'india',
  },
  {
    city: 'Nanded',
    state: 'maharashtra',
    country: 'india',
  },
];
