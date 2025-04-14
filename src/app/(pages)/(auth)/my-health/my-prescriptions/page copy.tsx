"use client";
import ImgTab from "@/src/components/imgTab/img-tab";
import UploadPresButton from "@/src/components/upload-prescription-btn/upload-prescription-btn";
import ArrowIcon from "@/src/icons/arrowIcon";
import ZoomSvg from "@/src/icons/zoomSvg";
import BackButtonWrapper from "@/src/ui/wrappers/BackButtonWrapper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";

export default function Page() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await fetch(
          "https://quickmeds.sndktech.online/priscription.getAll",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch prescriptions");
        }

        const data = await response.json();

        // Parsing `images` field correctly
        const formattedData = data.data.map((item: any) => ({
          ...item,
          images: item.images ? JSON.parse(item.images) : [], // Handle missing images
        }));

        setPrescriptions(formattedData);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  // ✅ Select & Unselect Image
  const toggleSelectImage = (imageUrl: string) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(imageUrl)
        ? prevSelected.filter((img) => img !== imageUrl) // Unselect
        : [...prevSelected, imageUrl] // Select
    );
  };

  // ✅ Handle Upload & Continue
  const handleContinueUpload = async () => {
    if (selectedImages.length === 0) {
      toast.error("Please select a prescription to upload!");
      return;
    }

    const userId = localStorage.getItem("userId");
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const authToken = localStorage.getItem("authToken");

    if (!userId || !storedPhoneNumber || !authToken) {
      toast.error("User ID, phone number, or auth token is missing!");
      return;
    }

    try {
      const requestBody = {
        userId,
        images: selectedImages,
        phoneNumberToConfirmOrder: storedPhoneNumber,
      };

      const response = await fetch(
        "https://quickmeds.sndktech.online/priscription.add",
        {
          method: "POST",
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();
      console.log("Upload Success:", result);

      if (response.ok) {
        toast.success("Prescriptions uploaded successfully!");
        // Store selectedImages in local storage
        localStorage.setItem("selectedPrescriptions", JSON.stringify(selectedImages));
        setSelectedImages([]); // Clear selected files
      } else {
        toast.error("Upload failed! Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <div className="bg-white rounded-xl p-4 w-full">
        <div className="flex items-center gap-3 mb-4">
          <BackButtonWrapper>
            <ArrowIcon
              arrowFillColor="#15A9A0"
              width={18}
              className="rotate-90"
            />
          </BackButtonWrapper>
          <h2 className="text-lg font-semibold">My Prescriptions</h2>
        </div>

        {/* Loading & Error Handling */}
        {loading && (
          <div className="text-center mt-5">Loading prescriptions...</div>
        )}
        {error && <div className="text-center text-red-500 mt-5">{error}</div>}

        {/* Prescription Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-5 py-3">
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) =>
              prescription.images.map((imageUrl: string, imgIndex: number) => (
                <div
                  key={`${prescription.id}-${imgIndex}`}
                  className={`w-[110px] h-[150px] group relative cursor-pointer rounded overflow-hidden border-2 ${
                    selectedImages.includes(imageUrl)
                      ? "border-primary-500"
                      : "border-transparent"
                  }`}
                  onClick={() => toggleSelectImage(imageUrl)}
                >
                  {/* Selection Checkmark */}
                  {selectedImages.includes(imageUrl) && (
                    <div className="absolute top-1 left-1 bg-primary-500 text-white p-1 rounded-full">
                      ✓
                    </div>
                  )}

                  {/* Zoom Icon on Hover */}
                  <div className="absolute bottom-2 right-2 group-hover:block hidden bg-black/30 rounded-full p-1">
                    <ZoomSvg />
                  </div>

                  {/* Prescription Image */}
                  <ImgTab
                    src={imageUrl || "/prescriptionImg.png"}
                    alt="prescription"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            )
          ) : (
            <div className="text-center mt-5">No prescriptions available.</div>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleContinueUpload}
            className="bg-primary-500 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2"
          >
            Upload & Continue
            <ArrowIcon arrowFillColor="#ffffff" width={18} />
          </button>
        </div>
      </div>
    </div>
  );
}