"use client";
import { useEffect, useState, useCallback } from "react";
import { loginObserver } from "@/src/observers/observable";
import CartItem from "./cart-item";
import CartSuggested from "./cart-suggested";
import { CartDataType } from "./cart";
import Api from "../utils/Api";
import MyPrescriptionsButton from "./MyPrescriptionsButton";

export default function Cart() {
  const [cartData, setCartData] = useState<CartDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // ✅ Fetch cart data from API
  const fetchCartData = useCallback(async () => {
    if (typeof window === "undefined") return;

    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    setLoading(true);
    setError("");

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
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Error fetching cart data");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Check login status and fetch cart data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setIsLoggedIn(false);
      loginObserver.notify(true); // Open login popup if not logged in
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartData();
    }
  }, [isLoggedIn, fetchCartData]);

  // ✅ Update Quantity in State Without Hiding Product
  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // ✅ Handle item removal
  const handleRemoveItem = (itemId: string) => {
    setCartData((prevCartData) =>
      prevCartData.filter((item) => item.id !== itemId)
    );
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {isLoggedIn ? (
        <>
          {cartData.length > 0 ? (
            <>
              <p className="text-2xl font-semibold">
                {cartData.length} items in your cart
              </p>
              {cartData.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  onUpdateCart={fetchCartData} // ✅ Fetch updated cart after removing item
                  onUpdateQuantity={updateCartQuantity} // ✅ Only update quantity in state
                />
              ))}
              <MyPrescriptionsButton />
              <CartSuggested randomData={cartData} />
            </>
          ) : (
            <p className="text-xl text-center text-gray-600">
              No items in your cart
            </p>
          )}
        </>
      ) : (
        <p className="text-xl text-center text-gray-600">
          Please login to view your cart.
        </p>
      )}
    </div>
    
  );
}
