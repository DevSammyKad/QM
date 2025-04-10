"use client";
import ArrowIcon from "@/src/icons/arrowIcon";
import CouponSvg from "@/src/icons/couponSvg";
import CrossSvg from "@/src/icons/crossSvg";
import QuickMedsLogoSvg from "@/src/icons/quickMedsLogoSvg";
import DialogWrapper from "@/src/ui/dialog-wrapper.tsx/dialog-wrapper";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Import toast for success message

const API_URL = "https://quickmeds.sndktech.online";
const AUTH_TOKEN = "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph";

type CouponsProps = {
  onApplyDiscount: (discount: number, couponCode: string) => void;
};

export default function Coupons({ onApplyDiscount }: CouponsProps) {
  const [openCoupons, setOpenCoupons] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${API_URL}/coupon.get`, {
        headers: {
          "x-authorization": AUTH_TOKEN,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        setCoupons(response.data.coupons);
      } else {
        console.error("Error fetching coupons:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error fetching coupons:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Apply Coupon from input field
  const applyCouponHandler = () => {
    if (!couponCode.trim()) return;

    const selectedCoupon = coupons.find(
      (coupon) => coupon.couponCode === couponCode
    );

    if (selectedCoupon) {
      onApplyDiscount(selectedCoupon.discountValue, couponCode);
      toast.success(
        `Coupon Applied: ${couponCode} - ₹${selectedCoupon.discountValue} OFF`
      );
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  // ✅ Apply Coupon from the modal list
  const applyCouponFromList = (coupon) => {
    onApplyDiscount(coupon.discountValue, coupon.couponCode);
    toast.success(
      `Coupon Applied: ${coupon.couponCode} - ₹${coupon.discountValue} OFF`
    );
    setOpenCoupons(false); // 🔥 Close modal after applying
    setCouponCode(coupon.couponCode); // 🔥 Set selected coupon in input field
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Best Coupon Section */}
      <div className="grid grid-cols-[max-content_1fr_max-content] text-sm font-semibold gap-2 items-center">
        <CouponSvg /> Best coupon for you
        <ArrowIcon
          width={16}
          className="-rotate-90 cursor-pointer"
          arrowFillColor="#15A9A0"
          onClick={() => setOpenCoupons(true)}
        />
      </div>

      {/* Coupon Input & Apply Button */}
      <div className="w-full flex items-center gap-5">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="text-[16px] flex-1 border border-shade py-1 px-3 bg-white rounded-md outline-none"
        />
        <Button
          color="secondary"
          variant="bordered"
          size="sm"
          className="min-h-fit min-w-fit w-fit h-fit border font-semibold p-0 px-4 py-2 text-xs"
          onClick={applyCouponHandler}
        >
          Apply Coupon
        </Button>
      </div>

      {/* Coupon Modal */}
      <DialogWrapper
        open={openCoupons}
        onClose={() => setOpenCoupons(false)}
        closeBtnIcon={<CrossSvg />}
        className="w-[45%] px-6 py-4 rounded-xl"
        title="Coupons"
        backgroundScroll="hidden"
      >
        <div className="w-full py-2 max-h-[60vh] flex flex-col gap-4">
          <p className="font-medium text-xl">Available Coupons</p>
          <div className="flex flex-col flex-1 overflow-y-auto gap-3">
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <Coupon
                  key={coupon.id}
                  coupon={coupon}
                  onApply={applyCouponFromList}
                />
              ))
            ) : (
              <p className="text-gray-500">No coupons available</p>
            )}
          </div>
        </div>
      </DialogWrapper>
    </div>
  );
}

// ✅ Coupon Component (Handles Click to Apply)
const Coupon = ({ coupon, onApply }) => {
  return (
    <div className="tracking-[1px] leading-none flex flex-col border p-3 rounded-md">
      <QuickMedsLogoSvg width={65} height={22} />
      <div className="flex justify-between gap-2 items-center font-semibold">
        <p className="uppercase">{coupon.couponCode}</p>
        <Button
          color="secondary"
          variant="light"
          size="sm"
          className="min-h-fit min-w-fit w-fit h-fit p-0 px-2 py-1 text-xs"
          onClick={() => onApply(coupon)}
        >
          Apply
        </Button>
      </div>
      <p className="text-shade text-sm">{coupon.description}</p>
    </div>
  );
};
