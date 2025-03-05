"use client";
import LogoutSvg from "@/src/icons/logoutSvg";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { profileIconLinks } from "../headerLink";
import "./style.css";

export default function HamburgerMenu() {
  const router = useRouter();
  const [headerActive, setHeaderActive] = useState(false);

  const handleMenu = (e: MouseEvent) => {
    e.preventDefault();
    setHeaderActive(!headerActive);
  };
  const handleMenuLink = (link: string) => {
    router.push(link);
    setHeaderActive(false);
  };

  useEffect(() => {
    if (headerActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [headerActive]);

  return (
    <>
      <div
        onClick={handleMenu}
        className="cursor-pointer hidden w-[50px] h-[50px] max-lg:flex justify-center items-center flex-col gap-[3px] p-[10px] rounded-full bg-white "
      >
        <input type="checkbox" id="checkbox" checked={headerActive} readOnly />
        <label htmlFor="checkbox" className="toggle">
          <div
            id="bar1"
            className=" bars grid grid-cols-[max-content_1fr] w-full mx-auto items-center  gap-1"
          >
            <div className="dot bg-secondary-500 w-1 h-1 rounded-full"></div>
            <div className="bg-secondary-500 w-full h-[3px]"></div>
          </div>
          <div
            id="bar2"
            className=" bars grid grid-cols-[max-content_1fr] w-full mx-auto items-center  gap-1"
          >
            <div className="dot bg-secondary-500 w-1 h-1 rounded-full"></div>
            <div className="bg-secondary-500 w-full h-[3px]"></div>
          </div>
          <div
            id="bar3"
            className=" bars grid grid-cols-[max-content_1fr] w-full mx-auto items-center  gap-1"
          >
            <div className="dot bg-secondary-500 w-1 h-1 rounded-full"></div>
            <div className="bg-secondary-500 w-full h-[3px]"></div>
          </div>
        </label>
      </div>
      <nav
        className={`${
          headerActive ? "w-full" : "w-0"
        } h-svh bg-body-gray  transition-all top-[60px] z-[-1] right-0 pt-3 fixed`}
      >
        {headerActive && (
          <div>
            {profileIconLinks.map((link) => (
              <div
                onClick={() => handleMenuLink(link.link)}
                className="grid gap-3 cursor-pointer hover:bg-body-gray text-lg whitespace-nowrap px-4 py-2 grid-cols-[max-content_1fr] items-center"
                key={link.label}
              >
                {link.Icon}
                {link.label}
              </div>
            ))}
            <div
              onClick={handleMenu}
              className="grid gap-3 hover:bg-body-gray text-lg whitespace-nowrap px-4 py-2 grid-cols-[max-content_1fr] items-center"
            >
              <LogoutSvg /> Logout
            </div>
          </div>
        )}{" "}
      </nav>
    </>
  );
}
