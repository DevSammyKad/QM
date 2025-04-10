"use client";
import ImgTab from "@/src/components/imgTab/img-tab";
import ArrowIcon from "@/src/icons/arrowIcon";
import ZoomSvg from "@/src/icons/zoomSvg";
import BackButtonWrapper from "@/src/ui/wrappers/BackButtonWrapper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const BASE_URL = "https://quickmeds.sndktech.online/uploads/"; // Base URL for images

  // Fetch image as blob with headers
  const fetchImageAsBlob = async (imagePath: string, authToken: string) => {
    const fullImageUrl = imagePath.startsWith("http")
      ? imagePath
      : `${BASE_URL}${imagePath}`; // Prepend base URL if it's just a filename
    try {
      const response = await fetch(fullImageUrl, {
        headers: {
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) throw new Error(`Failed to fetch image: ${fullImageUrl}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (err) {
      console.error(err);
      return null; // Fallback if image fetch fails
    }
  };

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

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
        console.log("API Response:", data); // Debug: Check the response

        const formattedData = await Promise.all(
          data.data.map(async (item: any) => {
            const images = item.images
              ? typeof item.images === "string"
                ? JSON.parse(item.images)
                : item.images
              : [];
            const blobUrls = await Promise.all(
              images.map((imagePath: string) =>
                fetchImageAsBlob(imagePath, authToken)
              )
            );
            return {
              ...item,
              images: blobUrls.filter((url) => url !== null), // Remove failed fetches
            };
          })
        );

        setPrescriptions(formattedData);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError("Failed to fetch prescriptions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const toggleSelectImage = (imageUrl: string) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(imageUrl)
        ? prevSelected.filter((img) => img !== imageUrl)
        : [...prevSelected, imageUrl]
    );
  };

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
      console.log("Upload Response:", result);

      if (response.ok) {
        toast.success("Prescriptions uploaded successfully!");
        setSelectedImages([]);
      } else {
        toast.error(`Upload failed: ${result.message || "Please try again."}`);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Something went wrong during upload!");
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

        {loading && (
          <div className="text-center mt-5">Loading prescriptions...</div>
        )}
        {error && <div className="text-center text-red-500 mt-5">{error}</div>}

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
                  {selectedImages.includes(imageUrl) && (
                    <div className="absolute top-1 left-1 bg-primary-500 text-white p-1 rounded-full">
                      ✓
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 group-hover:block hidden bg-black/30 rounded-full p-1">
                    <ZoomSvg />
                  </div>
                  <ImgTab
                    src={imageUrl || "/prescriptionImg.png"}
                    alt="prescription"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            )
          ) : (
            !loading && (
              <div className="text-center mt-5">No prescriptions available.</div>
            )
          )}
        </div>

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