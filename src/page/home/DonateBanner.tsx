'use client';
import ImgTab from '@/src/components/imgTab/img-tab';
import PlusSvg from '@/src/icons/plusSvg';
import { PrimaryButton, OutLinedButton } from '@/src/ui/buttons/buttons';
import DialogWrapper from '@/src/ui/dialog-wrapper.tsx/dialog-wrapper';
import FormInput from '@/src/ui/form/form-input';
import React, { useState } from 'react';

const DonateBanner = () => {
  const [openDonateForm, setOpenDonateForm] = useState(false);

  const openDonateFormHandler = () => {
    setOpenDonateForm(true);
  };
  const closeDonateFormHandler = () => {
    setOpenDonateForm(false);
  };

  return (
    <div className=" mx-10 my-5  max-md:hidden">
      <ImgTab
        src="/DonateBanner.png"
        className="h-[400px] w-full"
        onClick={openDonateFormHandler}
      />
      <DialogWrapper
        open={openDonateForm}
        onClose={closeDonateFormHandler}
        title="Donation Details"
        className="md:w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
      >
        <h1 className="text-2xl my-3 font-normal">Add details for donating</h1>

        <div className="flex flex-col justify-center items-center gap-5">
          <FormInput
            type="Full Name"
            placeholder="Full name (Required)*"
            value={''}
            //   onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="tel"
            placeholder="Phone number (Required)*"
            maxLength={10}
            //   value={phoneNumber}
            //   onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {/* {error && <p className="text-red-500">{error}</p>}{' '} */}
          {/* Display error */}

          <FormInput type="email" placeholder="Enter Email" value={''} />

          <FormInput
            type="Medicine Name"
            placeholder="Medicine Name"
            value={''}
          />
          <FormInput type="Expire date" placeholder="Expire date" value={''} />

          <OutLinedButton type="button" className="mt-4">
            <PlusSvg /> Add More
          </OutLinedButton>
          <PrimaryButton
            type="submit"
            className="text-xl py-3 rounded-2xl"
            //   disabled={loading} // Disable the button if loading
          >
            {/* {loading ? 'Sending...' : 'Log in'}
             */}
            Donate
          </PrimaryButton>
        </div>
      </DialogWrapper>
    </div>
  );
};

export default DonateBanner;
