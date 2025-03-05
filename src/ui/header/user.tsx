"use client";
import LogoutSvg from "@/src/icons/logoutSvg";
import UserSvg from "@/src/icons/userSvg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MenuWrapper from "../dialog-wrapper.tsx/menu-wrapper";
import { profileIconLinks } from "./headerLink";

export default function User() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const openMenuHandler = () => {
    setShowMenu(true);
  };
  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  const clickOptionHandler = (link: string) => {
    router.push(link);
    closeMenuHandler();
  };

  return (
    <div className="relative cursor-pointer ">
      <div className="flex items-center gap-2" onClick={openMenuHandler}>
        <UserSvg />
        Hello, Login
      </div>
      <MenuWrapper
        open={showMenu}
        onClose={closeMenuHandler}
        className="absolute shadow-product-card z-[99999] rounded overflow-hidden bg-white flex flex-col  top-full translate-y-[2.5%] left-0 -translate-x-1/3 w-fit"
      >
        {profileIconLinks.map((link) => (
          <div
            onClick={() => clickOptionHandler(link.link)}
            className="grid gap-3 hover:bg-body-gray  text-lg whitespace-nowrap px-4 py-2 grid-cols-[max-content_1fr] items-center"
            key={link.label}
          >
            {link.Icon}
            {link.label}
          </div>
        ))}
        <div
          onClick={closeMenuHandler}
          className="grid gap-3 hover:bg-body-gray text-lg whitespace-nowrap px-4 py-2 grid-cols-[max-content_1fr] items-center"
        >
          <LogoutSvg /> Logout
        </div>
      </MenuWrapper>
    </div>
  );
}
