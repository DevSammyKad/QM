import React from 'react';
import ArrowIcon from '@/src/icons/arrowIcon';
import EmailSvg from '@/src/icons/emailSvg';
import PhoneSvg from '@/src/icons/phoneSvg';
import UserSvg from '@/src/icons/userSvg';
import BackButtonWrapper from '@/src/ui/wrappers/BackButtonWrapper';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import FormInput from '@/src/ui/form/form-input';

const page = (profileId: string) => {
  return (
    <div>
      <div className="h-full w-7xl flex flex-col shadow-product-card bg-white rounded-lg">
        <div className="flex items-center px-5 py-2 gap-4">
          <BackButtonWrapper>
            <ArrowIcon
              arrowFillColor="#F26522"
              className="cursor-pointer rotate-90"
              width={15}
              height={15}
            />
          </BackButtonWrapper>
          Edit Profile
        </div>
        <div className="relative p-5">
          <div className="w-full h-1/2 bg-primary-500 absolute top-0 left-0 "></div>
          <div className="flex flex-col items-center w-fit gap-2">
            <Avatar
              src="/user.png"
              className="w-36 h-36 cursor-pointer text-large"
            />
            <p className="text-xs font-semibold cursor-pointer">
              Change Profile
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 pb-3">
          <form className="flex items-center px-5 max-sm:px-1 gap-4 max-sm:gap-1 py-2 justify-between">
            <UserSvg />
            <label className="flex-1 max-sm:pl-2">
              <p className="text-shade text-sm">User Name</p>
              <FormInput
                defaultValue={'Ankit'}
                type="text"
                className={`border-none w-full outline-none `}
              />
            </label>
            <FormInput
              type="tel"
              placeholder="Phone +91"
              maxLength={10}
              //   value={phoneNumber}
              //   onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </form>
          <Divider />
          <form className="flex items-center px-5 max-sm:px-1 gap-4 max-sm:gap-1 py-2 justify-between">
            <PhoneSvg />
            <label className="flex-1 max-sm:pl-2">
              <p className="text-shade text-sm">Phone number</p>
              <input
                type="tel"
                maxLength={10}
                className={`border-none w-full outline-none `}
                defaultValue={'8295451564'}
              />
            </label>
            <Button
              color="secondary"
              variant="light"
              className="font-semibold  max-sm:w-fit max-sm:min-w-fit  "
            >
              Edit
            </Button>
          </form>
          <Divider />
          <form className="flex items-center px-5 max-sm:px-1 gap-4 max-sm:gap-1 py-2 justify-between">
            <EmailSvg />
            <label className="flex-1 max-sm:pl-2">
              <p className="text-shade text-sm">Email</p>
              <input
                type="email"
                className={`border-none w-full outline-none `}
                defaultValue={'Fawadkhanexample@gmail.com'}
              />
            </label>
            <Button
              color="secondary"
              variant="light"
              className="font-semibold  max-sm:w-fit max-sm:min-w-fit  "
            >
              Edit
            </Button>
          </form>
          <Divider />
          <div className="flex justify-end w-full px-3 ">
            <Button
              className="text-sm w-fit h-fit !rounded py-1"
              variant="light"
              color="default"
            >
              Reset password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
