"use client";
import BellSvg from "@/src/icons/bellSvg";
import ThunderSvg from "@/src/icons/thunderSvg";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MenuWrapper from "../dialog-wrapper.tsx/menu-wrapper";
import EmptyNotification from "./empty-notificaiton";

export default function Notification() {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const openMenuHandler = () => {
    setShowNotification(true);
  };
  const closeMenuHandler = () => {
    setShowNotification(false);
  };

  return (
    <div className="relative cursor-pointer ">
      <div className="flex items-center gap-2" onClick={openMenuHandler}>
        <BellSvg />
      </div>
      <MenuWrapper
        open={showNotification}
        onClose={closeMenuHandler}
        className="absolute shadow-product-card  z-[99999] rounded overflow-hidden bg-white flex flex-col  top-full translate-y-[2.5%] left-0 -translate-x-2/3 w-fit"
      >
        <div className="flex flex-col gap-2 justify-between p-3">
          <NotificationTabs />
          <EmptyNotification />
        </div>
      </MenuWrapper>
    </div>
  );
}

export const NotificationTabs = () => {
  const [selected, setSelected] = useState<string>("All");
  const handleSelect = (value: string) => {
    setSelected(value);
  };
  return (
    <div className="flex justify-between w-full items-center gap-2">
      <Button
        onClick={() => handleSelect("All")}
        variant={selected === "All" ? "solid" : "bordered"}
        color="primary"
        className="p-0 py-1 px-3 h-fit min-h-fit text-sm border "
      >
        All
      </Button>
      <Button
        onClick={() => handleSelect("Order")}
        variant={selected === "Order" ? "solid" : "bordered"}
        color="primary"
        // startContent={<ShoppingBagSvg />}
        className="p-0 py-1 px-3 h-fit min-h-fit text-sm border "
      >
        Order info
      </Button>
      <Button
        onClick={() => handleSelect("Offers")}
        variant={selected === "Offers" ? "solid" : "bordered"}
        color="primary"
        startContent={<ThunderSvg />}
        className="p-0 py-1 px-3 h-fit min-h-fit text-sm border "
      >
        Offers
      </Button>
    </div>
  );
};

export const TabButton = ({
  selected,
  startIcon,
}: {
  selected: boolean;
  startIcon: JSX.Element;
}) => {
  return (
    <Button
      variant={selected ? "solid" : "bordered"}
      color="primary"
      startContent={startIcon}
      className="p-0 py-1 px-3 h-fit min-h-fit text-sm border "
    >
      All
    </Button>
  );
};
