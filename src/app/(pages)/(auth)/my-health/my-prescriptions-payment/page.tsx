"use client";
import UploadPresButton from "@/src/components/upload-prescription-btn/upload-prescription-btn";
import ArrowIcon from "@/src/icons/arrowIcon";
import ZoomSvg from "@/src/icons/zoomSvg";
import BackButtonWrapper from "@/src/ui/wrappers/BackButtonWrapper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";
import Link from "next/link";

const Routes = {
  payment: "/payment",
};

function AuthImg({ src, alt, className }) {
  const [objectUrl, setObjectUrl] = useState(null);
  const [error, setError] = useState(false);
  const fullUrl = `https://quickmeds.sndktech.online/${src}`;

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }
    const fetchImage = async () => {
      try {
        const response = await fetch(fullUrl, {
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setObjectUrl(url);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    fetchImage();
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  if (error || !src) {
    return <img src="/prescriptionImg.png" alt={alt} className={className} />;
  }
  return objectUrl ? (
    <img src={objectUrl} alt={alt} className={className} />
  ) : (
    <div className={className}>Loading...</div>
  );
}

export default function Page() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImages, setSelectedImages] = useState(() => {
    // Initialize from localStorage if available, otherwise empty array
    const savedImages = localStorage.getItem("selectedImages");
    return savedImages ? JSON.parse(savedImages) : [];
  });

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
        const formattedData = data.data.map((item) => ({
          ...item,
          images: item.images ? JSON.parse(item.images) : [],
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

  // Sync selectedImages with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedImages", JSON.stringify(selectedImages));
  }, [selectedImages]);

  const toggleSelectImage = (imageUrl) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(imageUrl)
        ? prevSelected.filter((img) => img !== imageUrl)
        : [...prevSelected, imageUrl]
    );
  };

  const handleContinueUpload = async () => {
    if (selectedImages.length === 0) {
      toast.error("Please select a prescription to upload!");
      return false;
    }

    const userId = localStorage.getItem("userId");
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const authToken = localStorage.getItem("authToken");

    if (!userId || !storedPhoneNumber || !authToken) {
      toast.error("User ID, phone number, or auth token is missing!");
      return false;
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
        setSelectedImages([]); // Reset after successful upload
        // localStorage.removeItem("selectedImages"); // Clear from localStorage
        return true;
      } else {
        toast.error("Upload failed! Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Something went wrong!");
      return false;
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
              prescription.images.map((imageUrl, imgIndex) => (
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
                  <AuthImg
                    src={imageUrl}
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

        <div className="flex justify-center mt-4">
          <Link href={Routes.payment} passHref legacyBehavior>
            <button
              onClick={async (e) => {
                const success = await handleContinueUpload();
                if (!success) {
                  e.preventDefault();
                }
              }}
              className="bg-primary-500 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2"
            >
              Upload & Continue
              <ArrowIcon arrowFillColor="#ffffff" width={18} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}