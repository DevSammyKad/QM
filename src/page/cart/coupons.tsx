"use client";
import ArrowIcon from "@/src/icons/arrowIcon";
import CouponSvg from "@/src/icons/couponSvg";
import CrossSvg from "@/src/icons/crossSvg";
import QuickMedsLogoSvg from "@/src/icons/quickMedsLogoSvg";
import DialogWrapper from "@/src/ui/dialog-wrapper.tsx/dialog-wrapper";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function Coupons() {
  const [openCoupons, setOpenCoupons] = useState<boolean>(false);
  const openCouponsHandler = () => {
    setOpenCoupons(true);
  };
  const closeCouponsHandler = () => {
    setOpenCoupons(false);
  };
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="grid grid-cols-[max-content_1fr_max-content] text-sm font-semibold gap-2 items-center">
        <CouponSvg /> Best coupon for you{" "}
        <ArrowIcon
          width={16}
          className="-rotate-90 cursor-pointer"
          arrowFillColor="#15A9A0"
          onClick={openCouponsHandler}
        />
      </div>
      <div className="w-full flex items-center gap-5">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="text-[16px] flex-1 border border-shade py-1 px-3 bg-white rounded-md outline-none"
        />
        <Button
          color="secondary"
          variant="bordered"
          size="sm"
          className="min-h-fit min-w-fit w-fit h-fit border font-semibold p-0 px-4 py-2 text-xs"
        >
          Apply Coupon
        </Button>
      </div>
      <DialogWrapper
        open={openCoupons}
        onClose={closeCouponsHandler}
        closeBtnIcon={<CrossSvg />}
        className="w-[45%] px-6 py-4 rounded-xl"
        title="Coupons"
        backgroundScroll="hidden"
      >
        <div className="w-full py-2 max-h-[60vh] flex flex-col gap-4">
          <div className="w-full flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              className="text-[16px] flex-1 border border-shade py-1 px-3 bg-white rounded-md outline-none"
            />
            <Button
              color="secondary"
              variant="bordered"
              size="sm"
              className="min-h-fit min-w-fit w-fit h-fit border font-semibold p-0 px-4 py-2 text-xs"
            >
              Apply Coupon
            </Button>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto gap-3">
            <p className="font-medium text-xl">Available coupons</p>
            <Coupon />
          </div>
        </div>
      </DialogWrapper>
    </div>
  );
}

export const Coupon = () => {
  return (
    <div className="tracking-[1px] leading-none flex flex-col">
      <QuickMedsLogoSvg width={65} height={22} />
      <div className="flex justify-between gap-2 items-center font-semibold">
        <p className="uppercase">Quickmedsnew</p>
        <Button
          color="secondary"
          variant="light"
          size="sm"
          className="min-h-fit min-w-fit w-fit h-fit p-0 px-2 py-1 text-xs"
        >
          Apply
        </Button>
      </div>
      <p className="text-shade  text-sm">
        Get up to 8% off + up to 15% off on your 1st allopathy medicine order.
      </p>
    </div>
  );
};
