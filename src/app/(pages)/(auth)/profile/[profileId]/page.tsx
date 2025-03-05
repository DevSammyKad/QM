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
import Image from 'next/image';

const page = (profileId: string) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
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
        {/* Background Header */}
        <div className="relative p-5">
          <div className="w-full h-1/2 bg-primary-500 absolute top-0 left-0 "></div>
          <div className="flex flex-col items-center w-fit gap-2">
            <Avatar
              src="/user.png"
              className="w-36 h-36 cursor-pointer text-large"
            />
            <div className="text-center mb-4">
              <button className="text-teal-600 hover:text-teal-800 transition-colors">
                Change Picture
              </button>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {/* Username Input */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                defaultValue="Fawa khan"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                defaultValue="+91 0987654321"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue="Fawadkhanexample@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Age Input */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                id="age"
                type="number"
                defaultValue="33"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Gender Input */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                id="gender"
                defaultValue="Male"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
