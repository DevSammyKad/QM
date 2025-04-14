'use client';
import { Routes } from '@/routes.config';
import CrossSvg from '@/src/icons/crossSvg';
import Address from '@/src/page/cart/address';
import Bill from '@/src/page/cart/bill';
import Coupons from '@/src/page/cart/coupons';
import OrderConfirmPopUp from '@/src/page/payment-page/OrderConfirmPopUp';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import DialogWrapper from '@/src/ui/dialog-wrapper.tsx/dialog-wrapper';
import { Divider } from '@nextui-org/react';
import Link from 'next/link';
import CartItem from '@/src/page/cart/cart-item';
import Api from '../../utils/Api';
import React, { useState, useEffect, useCallback } from "react";

const apiUrl = 'https://quickmeds.sndktech.online/adminOrder';
const API_URL = 'https://quickmeds.sndktech.online';
const GOOGLE_MAPS_API_KEY = 'AIzaSyAN2H3mnB8KIdj4HHd5W7AX9U_rGPLx9PY';

const Page = () => {
  const [openOrderConfirmPopUp, setOpenOrderConfirmPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [addressData, setAddressData] = useState({
    name: "",
    state: "",
    city: "",
    phone: "",
    address: "",
  });
  const [amount, setAmount] = useState(0);
  const [otherServiceCharge, setOtherServiceCharge] = useState(0);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setIsFetchingLocation(false);
      },
      (err) => {
        setError("Failed to get location: " + err.message);
        setIsFetchingLocation(false);
      },
      { timeout: 10000 }
    );
  }, []);

  const fetchGoogleMapsAddress = useCallback(async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch address from Google Maps");
      }

      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const newAddress = {
          name: addressData.name || "User",
          phone: addressData.phone || "",
          address: data.results[0].formatted_address,
          city: "",
          state: "",
        };

        addressComponents.forEach((component) => {
          if (component.types.includes("locality")) {
            newAddress.city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            newAddress.state = component.long_name;
          }
        });

        setAddressData(newAddress);
        setDefaultAddress(newAddress);
      } else {
        throw new Error("No address results found");
      }
    } catch (err) {
      console.error("Google Maps API error:", err);
      setError("Failed to fetch address: " + err.message);
    }
  }, [addressData.name, addressData.phone]);

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
      const products = data.productCart || [];
      
      const validProducts = products.filter(
        (item) => item.product && item.product.id
      );
      setCartProducts(validProducts);

      const baseTotal = validProducts.reduce(
        (sum, item) => sum + (item.product.sellingPrice || 0) * (item.quantity || 0),
        0
      );
      
      const gstCharge = baseTotal * 0.12;
      setOtherServiceCharge(gstCharge);
      setAmount(baseTotal + gstCharge);

    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Error fetching cart data");
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    getUserLocation();
  }, [fetchCartData, fetchAddress, getUserLocation]);

  useEffect(() => {
    if (userLocation.lat && userLocation.lng) {
      fetchGoogleMapsAddress(userLocation.lat, userLocation.lng);
    }
  }, [userLocation, fetchGoogleMapsAddress]);

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

    if (!userLocation.lat || !userLocation.lng) {
      setError("Location data is required. Please allow location access.");
      return;
    }

    const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // e.g., "2025-03-19 15:43:11"
  const selectedPrescriptions = JSON.parse(localStorage.getItem("selectedPrescriptions") || "[]");

    const orderData = {
      products: cartProducts.map((item) => ({
        productId: item.product?.id || "unknown",
        name: item.product?.productName || "Unknown Product",
        price: item.product?.sellingPrice || 0,
        quantity: item.quantity || 1,
      })),
      name: addressData.name,
      state: addressData.state,
      city: addressData.city,
      phone: addressData.phone,
      address: addressData.street || "",
      amount: amount,
      otherServiceCharge: otherServiceCharge,
      userId: storedUserId,
      userlatitude: userLocation.lat,  // Changed to match API response key
      userlongitude: userLocation.lng, // Changed to match API response key
      orderDate: formattedDate,
      prescription: selectedPrescriptions,
    };

    try {
      setIsLoading(true);
      console.log("Sending order data:", orderData); // Debug log
      
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
      console.log("API Response:", result); // Debug log

      if (response.ok && result.status) {
        setOrderPlaced(true);
        setError(null);
        setCartProducts([]);
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
    <div className="container mx-auto px-4 py-8">
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
            <div className="text-center text-gray-500">Loading cart...</div>
          )}
          {isFetchingLocation && (
            <div className="text-center text-gray-500">Fetching location...</div>
          )}
          
          <Coupons />
          <Divider className="h-1" />
          
          <Bill 
            cartProducts={cartProducts} 
            amount={amount} 
            setAmount={setAmount}
            otherServiceCharge={otherServiceCharge}
          />
          <Divider className="h-1" />
          
          <Address setAddressData={setAddressData} />

          {error && !isLoading && (
            <div className="text-red-500 text-center mb-4">
              <p>{error}</p>
            </div>
          )}

          {/* {userLocation.lat && userLocation.lng && (
            <div className="text-sm text-gray-600 mt-2">
              Detected Location: Lat {userLocation.lat.toFixed(4)}, Lng {userLocation.lng.toFixed(4)}
            </div>
          )} */}

          <PrimaryButton
            className="rounded-2xl w-full mt-4"
            onClick={handlePlaceOrder}
            disabled={isLoading || !cartProducts.length || isFetchingLocation || !userLocation.lat}
          >
            {isLoading ? "Placing Order..." : "Pay & Place Order"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Page;