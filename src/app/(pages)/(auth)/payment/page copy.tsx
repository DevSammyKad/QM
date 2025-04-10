"use client";
import { Routes } from "@/routes.config";
import CrossSvg from "@/src/icons/crossSvg";
import Address from "@/src/page/cart/address";
import Bill from "@/src/page/cart/bill";
import Coupons from "@/src/page/cart/coupons";
import OrderConfirmPopUp from "@/src/page/payment-page/OrderConfirmPopUp";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import DialogWrapper from "@/src/ui/dialog-wrapper.tsx/dialog-wrapper";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import CartItem from "@/src/page/cart/cart-item";
import Api from "../../utils/Api";
import React, { useState, useEffect, useCallback } from "react";

// Your API endpoint
const apiUrl = "https://quickmeds.sndktech.online/adminOrder";
const API_URL = "https://quickmeds.sndktech.online";

const page = () => {
  const [openOrderConfirmPopUp, setOpenOrderConfirmPopUp] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [addressData, setAddressData] = useState({
    name: "",
    state: "",
    city: "",
    phone: "",
    address: "",
  });
  const [amount, setAmount] = useState<number>(0);
  const [defaultAddress, setDefaultAddress] = useState<any | null>(null);

  // Fetch cart data without displaying it
  const fetchCartData = useCallback(async () => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!authToken || !userId) {
      setError("User not authenticated. Please log in.");
      return;
    }

    setIsLoading(true);
    setError(null);

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
      console.log("API response123456:", data);
      const products = data.productCart || [];

      // Filter out items without a valid product object
      const validProducts = products.filter(
        (item) => item.product && item.product.id
      );
      setCartProducts(validProducts);

      // Calculate total amount only for valid products
      const total = validProducts.reduce(
        (sum: number, item: any) =>
          sum + (item.product.sellingPrice || 0) * (item.quantity || 0),
        0
      );
      setAmount(total);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Error fetching cart data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch default address using fetch instead of axios
  const fetchAddress = useCallback(async () => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setError("No authentication token found.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/address.get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch address");

      const data = await response.json();

      if (data.status && data.addresses?.length > 0) {
        const fetchedAddress = data.addresses[0];
        setDefaultAddress(fetchedAddress);
        setAddressData({
          name: fetchedAddress.name || "",
          state: fetchedAddress.state || "",
          city: fetchedAddress.city || "",
          phone: fetchedAddress.phone || "",
          address: fetchedAddress.street || "",
        });
      } else {
        setDefaultAddress(null);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setError("Failed to fetch address.");
      setDefaultAddress(null);
    }
  }, []);

  useEffect(() => {
    fetchCartData();
    fetchAddress();
  }, [fetchCartData, fetchAddress]);

  const openOrderConfirmPopUpHandler = () => {
    setOpenOrderConfirmPopUp(true);
  };

  const closeOrderConfirmPopUpHandler = () => {
    setOpenOrderConfirmPopUp(false);
  };

  const handlePlaceOrder = async () => {
    setError(null);

    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken || !storedUserId) {
      setError("User not authenticated. Please log in.");
      return;
    }

    if (!cartProducts.length) {
      setError("Cart is empty. Add items to place an order.");
      return;
    }

    console.log("cartProducts before mapping:", cartProducts); // Debug cart data

    const orderData = {
      products: cartProducts.map((item) => ({
        productId: item.product?.id || "unknown", // Fallback if id is missing
        name: item.product?.productName || "Unknown Product", // Fallback
        price: item.product?.sellingPrice || 0, // Fallback
        quantity: item.quantity || 1, // Fallback
      })),
      ...addressData,
      amount,
      userId: storedUserId,
    };

    // if (
    //   !orderData.products.length ||
    //   !orderData.name ||
    //   !orderData.state ||
    //   !orderData.city ||
    //   !orderData.phone ||
    //   !orderData.address ||
    //   !orderData.amount
    // ) {
    //   setError("Please fill all required fields.");
    //   return;
    // }

    try {
      setIsLoading(true);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok && result.status) {
        setOrderPlaced(true);
        setError(null);
        setCartProducts([]); // Clear cart locally (backend already clears it)
        openOrderConfirmPopUpHandler();
      } else {
        setError(result.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <DialogWrapper
        open={openOrderConfirmPopUp}
        onClose={closeOrderConfirmPopUpHandler}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[45%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
      >
        <OrderConfirmPopUp />
      </DialogWrapper>
      <div className="grid md:grid-cols-2 gap-10">
        <div>Payment Option Show Here (Dynamic)</div>
        <div className="flex flex-col gap-6">
          {isLoading && (
            <div className="text-center text-gray-500">Loading...</div>
          )}
          <Coupons />
          <Divider className="h-1" />
          <Bill
            cartProducts={cartProducts}
            amount={amount}
            setAmount={setAmount}
          />
          <Divider className="h-1" />
          <Address setAddressData={setAddressData} />

          {/* Display error if present */}
          {error && !isLoading && (
            <div className="text-red-500 text-center mb-4">
              <p>{error}</p>
            </div>
          )}

          <PrimaryButton
            className="rounded-2xl"
            onClick={handlePlaceOrder}
            disabled={isLoading || !cartProducts.length}
          >
            {isLoading ? "Placing Order..." : "Pay & Place Order"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default page;
