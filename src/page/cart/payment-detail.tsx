"use client";

import { useState, useEffect } from "react";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import { Divider } from "@nextui-org/react";
import Address from "./address";
import Bill from "./bill";
import Coupons from "./coupons";
import { Routes } from "@/routes.config";
import Link from "next/link";

export default function PaymentDetail({ cartData }) {
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [cart, setCart] = useState(cartData);

  // Update cart whenever cartData changes
  useEffect(() => {
    setCart(cartData);
  }, [cartData]);

  // Check if user is logged in
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  // Hide PaymentDetail if user is not logged in
  if (isLoggedIn === false) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Coupons Component - Updates applied discount */}
      <Coupons onApplyDiscount={setAppliedDiscount} />
      <Divider className="h-1" />

      {/* Bill Component - Displays Cart Amounts */}
      <Bill appliedDiscount={appliedDiscount} cart={cart} /> {/* ✅ Updated */}
      <Divider className="h-1" />

      {/* Address Component - Select Delivery Address */}
      <Address />

      {/* Proceed to Payment Button */}
      <Link href={Routes.payment}>
        <PrimaryButton className="rounded-2xl">
          Proceed to Payment
        </PrimaryButton>
      </Link>
    </div>
  );
}
