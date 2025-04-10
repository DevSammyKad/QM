"use client";
import Image from "next/image";
import { Upload, FileText, ArrowLeft } from "lucide-react";
import BackButtonWrapper from "@/src/ui/wrappers/BackButtonWrapper";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadPrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState<File[]>([]);
  const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([]);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setPrescriptions((prev) => [...prev, ...Array.from(files)]);
    setUploadedFileNames([]);
  };

  const uploadFiles = async (files: File[], authToken: string) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const uploadResponse = await fetch(
        "https://quickmeds.sndktech.online/upload-files",
        {
          method: "POST",
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            "Authorization": `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Upload failed with status ${uploadResponse.status}: ${errorText}`);
      }

      const uploadResult = await uploadResponse.json();
      console.log("Upload response:", uploadResult);

      if (uploadResult.files && Array.isArray(uploadResult.files)) {
        return uploadResult.files; // Returns array of filenames like "1742460059106-316971781.png"
      } else {
        throw new Error("Invalid response format: 'files' array not found");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };

  const handleContinueUpload = async () => {
    if (prescriptions.length === 0) {
      toast.error("Please select a prescription to upload!");
      return;
    }

    const userId = localStorage.getItem("userId");
    const phoneNumberToConfirmOrder = localStorage.getItem("phoneNumber");
    const authToken = localStorage.getItem("authToken");

    if (!userId || !phoneNumberToConfirmOrder || !authToken) {
      toast.error("Authentication details are missing!");
      return;
    }

    try {
      // Upload files first
      const uploadedImageNames = await uploadFiles(prescriptions, authToken);
      setUploadedFileNames(uploadedImageNames);

      // Add "uploads/" prefix for the API request
      const prefixedImageNames = uploadedImageNames.map((name) => `uploads/${name}`);

      // Prepare request body with prefixed filenames
      const requestBody = {
        userId: parseInt(userId),
        images: prefixedImageNames, // Send with "uploads/" prefix to match cURL
        phoneNumberToConfirmOrder: phoneNumberToConfirmOrder,
      };

      const response = await fetch(
        "https://quickmeds.sndktech.online/priscription.add",
        {
          method: "POST",
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();
      console.log("Prescription add response:", result);

      if (response.ok && result.status === true) {
        toast.success(result.message || "Prescriptions uploaded successfully!");
        setPrescriptions([]);
        localStorage.setItem("selectedPrescriptions", JSON.stringify(prefixedImageNames));
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error in upload process:", error);
      toast.error(error.message || "Something went wrong during upload!");
      setUploadedFileNames([]);
    }
  };

  const removePrescription = (fileName: string) => {
    setPrescriptions((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <div className="grid grid-cols-2 space-x-8 p-6">
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

        <div className="flex flex-col gap-4">
          <label className="flex items-center border border-gray-300 rounded-lg p-4 w-full hover:bg-gray-100 cursor-pointer">
            <Upload className="text-gray-400" size={40} />
            <span className="text-gray-500 font-medium ml-2">Upload new</span>
            <input
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              accept=".jpeg,.jpg,.png,.pdf"
            />
          </label>

          <button
            className="flex items-center border border-gray-300 rounded-lg p-4 w-full hover:bg-gray-100"
            onClick={() => router.push("./my-prescriptions")}
          >
            <FileText className="text-gray-400" size={40} />
            <span className="text-gray-500 font-medium ml-2">
              My prescription
            </span>
          </button>
        </div>

        <h3 className="mt-6 text-gray-700 font-semibold">
          Attached Prescription
        </h3>
        {prescriptions.length === 0 && uploadedFileNames.length === 0 ? (
          <div className="flex items-center justify-center border border-dashed border-gray-400 rounded-lg p-6 mt-2">
            <FileText className="text-gray-400" size={40} />
            <p className="text-gray-500 text-sm ml-2">
              Uploaded prescriptions will be shown here
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-5 px-5 py-5">
            {/* Show local files before upload */}
            {prescriptions.map((file) => (
              <div
                key={file.name}
                className="w-[110px] h-[150px] group relative cursor-pointer rounded overflow-hidden"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt="prescription"
                  width={110}
                  height={150}
                  className="object-cover rounded-lg"
                />
                <button
                  onClick={() => removePrescription(file.name)}
                  className="absolute top-1 right-1 bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-75 hover:opacity-100"
                >
                  ✖
                </button>
              </div>
            ))}
            {/* Show uploaded filenames with "uploads/" prefix */}
            {uploadedFileNames.map((fileName) => (
              <div
                key={fileName}
                className="w-[110px] h-[150px] group relative cursor-pointer rounded overflow-hidden bg-gray-100 flex items-center justify-center"
              >
                <div className="text-center p-2">
                  <FileText className="text-gray-400 mx-auto" size={40} />
                  <p className="text-gray-700 text-xs mt-2 break-words">
                    {`uploads/${fileName}`} {/* Add "uploads/" prefix here */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleContinueUpload}
            className="bg-primary-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-primary-600 flex items-center gap-2"
          >
            Continue →
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-primary-500 font-medium text-xl mb-4">
          Guide For Valid Prescription
        </h1>
        <div className="flex space-x-6">
          <div className="w-1/2">
            <Image
              src="/prescriptionGuide.png"
              alt="Prescription Guide"
              width={300}
              height={200}
              className="object-cover rounded-lg"
            />
          </div>
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