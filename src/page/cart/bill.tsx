"use client";
import { useEffect, useState } from "react";
import { Divider } from "@nextui-org/divider";
import Api from "../utils/Api";

type BillProps = {
  appliedDiscount: number;
};

export default function Bill({ appliedDiscount = 0 }: BillProps) {
  const [cartData, setCartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

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
      console.log("Cart API Response:", data);

      setCartData(data.productCart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Error fetching cart data");
    } finally {
      setLoading(false);
    }
  };

  // Safe calculations with default values
  const cartMRP = cartData.reduce(
    (total, item) => total + (item.product?.mrp || 0) * (item.quantity || 1),
    0
  );

  const totalDiscount = cartData.reduce(
    (total, item) =>
      total +
      ((item.product?.mrp || 0) - (item.product?.sellingPrice || 0)) *
        (item.quantity || 1),
    0
  );

  const otherService = (cartMRP - totalDiscount) * 0.12; // 12% GST on final cart amount

  const payableAmount = Math.max(
    cartMRP - totalDiscount - appliedDiscount + otherService,
    0
  ); // Ensures no negative value

  if (loading)
    return <p className="text-center text-gray-500">Loading bill...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[22px] font-semibold">Bill Summary</p>
      <div className="text-shade flex flex-col gap-2">
        <p className="flex items-center justify-between gap-3">
          <span>Cart MRP</span>
          <span>₹{cartMRP.toFixed(2)}</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span>Total Discount</span>
          <span className="text-red-500">-₹{totalDiscount.toFixed(2)}</span>
        </p>
        {appliedDiscount > 0 && (
          <p className="flex items-center justify-between gap-3">
            <span>Coupon Discount</span>
            <span className="text-green-500">
              -₹{appliedDiscount.toFixed(2)}
            </span>
          </p>
        )}
        <p className="flex items-center justify-between gap-3">
          <span>Other Services (12% GST)</span>
          <span>₹{otherService.toFixed(2)}</span>
        </p>
        <Divider />
        <p className="flex text-black font-semibold text-xl items-center justify-between gap-3">
          <span>To be Paid</span>
          <span>₹{payableAmount.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
