import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  ProductDetailsType,
  ProductVariantType,
} from "@/src/types/productTypes";

// Define context and provider types
type ProductContextType = {
  productData: ProductDetailsType | null;
  setProductData: React.Dispatch<
    React.SetStateAction<ProductDetailsType | null>
  >;
  selectedVariant: ProductVariantType | null;
  setSelectedVariant: React.Dispatch<
    React.SetStateAction<ProductVariantType | null>
  >;
  loading: boolean;
  error: string;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC = ({ children }) => {
  const [productData, setProductData] = useState<ProductDetailsType | null>(
    null
  );
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariantType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          "https://quickmeds.sndktech.online/product.get/17",
          {
            headers: {
              "Content-Type": "application/json",
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Authorization token
            },
          }
        );

        const data = response.data?.product || {};
        setProductData(data);
        setSelectedVariant(data.variants?.[0] || null);
      } catch (error) {
        setError("Error fetching product data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productData,
        setProductData,
        selectedVariant,
        setSelectedVariant,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use ProductContext
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
