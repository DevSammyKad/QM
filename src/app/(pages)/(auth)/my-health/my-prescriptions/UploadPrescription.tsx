"use client";
import Image from "next/image";
import { Upload, FileText, ArrowLeft } from "lucide-react"; // Using Lucide Icons
import BackButtonWrapper from "@/src/ui/wrappers/BackButtonWrapper";
import { useState } from "react";

export default function UploadPrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  return (
    <div className="grid grid-cols-2 space-x-8 p-6">
      {/* Left Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <BackButtonWrapper>
            <ArrowLeft className="text-primary-500" size={24} />
          </BackButtonWrapper>
          <h2 className="text-lg font-semibold">Upload Prescription</h2>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Please attach a prescription to proceed
        </p>

        {/* Upload & My Prescription Buttons */}
        <div className="flex flex-col gap-4">
          <button className="flex items-center   border border-gray-300 rounded-lg p-4 w-full hover:bg-gray-100">
            <Upload className="text-gray-400 " size={40} />
            <span className="text-gray-500 font-medium ml-2">Upload new</span>
          </button>

          <button className="flex items-center border border-gray-300 rounded-lg p-4 w-full hover:bg-gray-100">
            <FileText className="text-gray-400  " size={40} />
            <span className="text-gray-500 font-medium ml-2">My prescription</span>
          </button>
        </div>

        {/* Attached Prescription Section */}
        <h3 className="mt-6 text-gray-700 font-semibold">
          Attached Prescription
        </h3>
        <div className="flex items-center justify-center border border-dashed border-gray-400 rounded-lg p-6 mt-2">
          <FileText className="text-gray-400" size={40} />
          <p className="text-gray-500 text-sm ml-2">
            Uploaded prescriptions will be shown here
          </p>
        </div>

        {/* Prescription List */}
        <div className="flex flex-wrap gap-5 px-5 py-5">
          {prescriptions.map((prescription: any) => (
            <div
              key={prescription.id}
              className="w-[110px] h-[150px] group relative cursor-pointer rounded overflow-hidden"
            >
              <Image
                src={prescription.imageUrl || "/prescriptionImg.png"}
                alt="prescription"
                width={110}
                height={150}
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-primary-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-primary-600 flex items-center gap-2 ">
            Continue →
          </button>
        </div>
      </div>

      {/* Right Section - Guide for Valid Prescription */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-primary-500 font-medium text-xl mb-4">
          Guide For Valid Prescription
        </h1>

        <div className="flex space-x-6">
          {/* Guide Image */}
          <div className="w-1/2">
            <Image
              src="/prescriptionGuide.png"
              alt="Prescription Guide"
              width={300}
              height={200}
              className="object-cover rounded-lg"
            />
          </div>

          {/* Guide List */}
          <div className="w-1/2">
            <ul className="list-disc text-gray-700 pl-4">
              {guideList.map((list) => (
                <li className="mb-3" key={list}>
                  {list}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const guideList = [
  "Don’t crop out any part of the image",
  "Avoid blurred image",
  "Include details of doctor and patient + clinic visit date",
  "Medicines will be dispensed as per prescription",
  "Supported file types: jpeg, jpg, png, pdf",
  "Maximum allowed file size: 5MB",
];
