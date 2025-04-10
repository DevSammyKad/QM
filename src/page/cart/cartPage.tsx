"use client";
import { useEffect, useState } from "react";
import Cart from "./cart";
import Bill from "./bill";
import Api from "../utils/Api";

export default function CartPage() {
  const [cartData, setCartData] = useState([]); // Store cart data from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    try {
      const response = await fetch(Api.ProductCartData, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch cart data");

      const data = await response.json();
      setCartData(data.productCart || []);
    } catch (err) {
      setError("Error fetching cart data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <Cart cartData={cartData} setCartData={setCartData} />
          <Bill cartData={cartData} />
        </>
      )}
    </div>
  );
}
