"use client";

import { cn } from "@/cn.config";
import CrossSvg from "@/src/icons/crossSvg";
import DialogWrapper from "@/src/ui/dialog-wrapper.tsx/dialog-wrapper";
import { ReactNode, useState } from "react";
import ImgTab from "../imgTab/img-tab";

type Props = {
  buttonClass?: string;
  wrapperClass?: string;
  children: ReactNode;
};

export default function UploadPresButton({
  buttonClass,
  wrapperClass,
  children,
}: Props) {
  const [openUpload, setOpenUpload] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // State to hold phone number
  const [images, setImages] = useState<string[]>([]); // State to hold image URLs or base64 strings
  const [loading, setLoading] = useState(false); // Loading state to show a loading indicator

  const openUploadHandler = () => {
    console.log("Upload button pressed");
    setOpenUpload(true);
  };

  const closeUploadHandler = () => {
    setOpenUpload(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileUrls = Array.from(e.target.files).map(
        (file) => URL.createObjectURL(file) // Convert each file to a URL (can also use base64 encoding)
      );
      setImages(fileUrls); // Store image URLs in the state
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value); // Update phone number
  };

  const handleSubmit = async () => {
    // Start loading when submitting
    setLoading(true);

    try {
      // Prepare the JSON object with the images (URLs or base64 strings) and phone number
      const payload = {
        userId: 3, // You can replace this with dynamic user ID if needed
        images: images, // Images will be URLs (or base64)
        phoneNumberToConfirmOrder: 1283747646,
      };

      // Make the API request to upload the prescription data in JSON format
      const response = await fetch(
        "https://quickmeds.sndktech.online/priscription.add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Authorization token
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2NzQ1Mzg1LCJleHAiOjE3NDgzMDI5ODV9.5wRlYbaliLtMW57h7YCASiJZsESXS1Ouo6i48zuIyTI",
          },
          body: JSON.stringify(payload), // Send the payload as JSON
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Prescription uploaded successfully!");
        console.log(result.message);
      } else {
        alert("Failed to upload prescription.");
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error uploading prescription:", error);
      alert("An error occurred while uploading the prescription.");
    } finally {
      setLoading(false); // Stop loading after the request completes
      closeUploadHandler(); // Close the upload dialog
    }
  };

  return (
    <div className={cn("relative ", wrapperClass)}>
      <div
        className={cn("cursor-pointer ", buttonClass)}
        onClick={openUploadHandler}
      >
        {children}
      </div>
      <DialogWrapper
        open={openUpload}
        onClose={closeUploadHandler}
        closeBtnIcon={<CrossSvg />}
        className="min-w-[400px] max-sm:min-w-[90%] max-sm:max-w-[90%] aspect-video max-sm:aspect-auto bg-white relative rounded-xl pt-3 pb-5 px-5 shadow-product-card"
      >
        <label className="bg-input-blue w-full h-full flex items-center justify-center flex-col rounded-xl">
          <ImgTab
            src="/uploadpres.png"
            alt="upload-prescription"
            className="w-[100px]"
          />
          <div className="flex items-center px-3 whitespace-nowrap max-[425px]:whitespace-normal">
            <p className="text-center pb-2">
              Upload your Prescription here, or
              <span className="text-blue-500 cursor-pointer">&nbsp;browse</span>
            </p>
            <input
              type="file"
              className="hidden"
              multiple // Allow multiple file selection
              onChange={handleFileChange} // Handle file change
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit Prescription"}
          </button>
        </label>
      </DialogWrapper>
    </div>
  );
}
