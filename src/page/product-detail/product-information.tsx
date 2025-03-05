import { useEffect, useState } from "react";

type Props = {
  productId: string; // Accept productId to fetch data
};

export default function ProductInformation({ productId }: Props) {
  // State to hold product data
  const [productData, setProductData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // To show loading state
  const [error, setError] = useState<string>(""); // To capture any error messages

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log("Fetching product with ID:", productId); // Log the productId
        const response = await fetch(
          `https://quickmeds.sndktech.online/product.get/17`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Authorization token
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2NzQ1Mzg1LCJleHAiOjE3NDgzMDI5ODV9.5wRlYbaliLtMW57h7YCASiJZsESXS1Ouo6i48zuIyTI",
            },
          }
        );
        const result = await response.json();
        console.log(result); // Log the response to ensure the data structure is correct

        if (response.ok && result.status === true) {
          setProductData(result.product); // Set fetched product data in state
        } else {
          setError(result.message || "Failed to fetch product details");
        }
      } catch (err) {
        setError("An error occurred while fetching product data");
        console.error(err);
      } finally {
        setLoading(false); // Stop loading after the request is finished
      }
    };

    fetchProductDetails();
  }, [productId]); // Re-run the effect when productId changes

  // Handle loading, error, and absence of data
  if (loading) {
    return <p>Loading...</p>; // Show loading text while fetching
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Show error message if there's an issue
  }

  if (!productData) {
    return <p>No product data available</p>; // If there's no product data
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[28px] font-semibold">Product Information</h2>
      {/* Render the product introduction dynamically if it exists */}
      <p>
        {productData?.productIntroduction ||
          "Product introduction not available."}
      </p>
    </div>
  );
}
