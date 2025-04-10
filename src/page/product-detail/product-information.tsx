import { useEffect, useState } from "react";

type Props = {
  productId: string;
  productIntroduction?: string;
  composition?: string;
  uses?: string;
  benefits?: string;
  contradictions?: string;
  // isPrescriptionRequired?: boolean;
};

export default function ProductInformation({
  productId,
  productIntroduction,
  composition,
  uses,
  benefits,
  contradictions,
  // isPrescriptionRequired,
}: Props) {
  const [productData, setProductData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      try {
        console.log("Fetching product with ID:", productId);
        const response = await fetch(
          `https://quickmeds.sndktech.online/product.get/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            },
          }
        );
        const result = await response.json();
        console.log("API Response:", result);

        if (response.ok && result.status === true) {
          setProductData(result.product);
        } else {
          setError(result.message || "Failed to fetch product details");
        }
      } catch (err) {
        setError("An error occurred while fetching product data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-4">
      {/* 🔹 Heading Size Increased */}
      <h2 className="text-[32px] font-bold border-b pb-2">
        Product Information
      </h2>

      {/* 🔹 Each section has a bold title using Tailwind */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Introduction</h3>
        <p className="text-gray-700">
          {productIntroduction || "Not available"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Composition</h3>
        <p className="text-gray-700">{composition || "Not available"}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Uses</h3>
        <p className="text-gray-700">{uses || "Not available"}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Benefits</h3>
        <p className="text-gray-700">{benefits || "Not available"}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Contradictions</h3>
        <p className="text-gray-700">{contradictions || "Not available"}</p>
      </div>

      {/* <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Prescription Required</h3>
        <p className="text-gray-700">{isPrescriptionRequired ? "Yes" : "No"}</p>
      </div> */}
    </div>
  );
}
