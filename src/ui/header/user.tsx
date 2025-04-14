"use client";
import LogoutSvg from "@/src/icons/logoutSvg";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MenuWrapper from "../dialog-wrapper.tsx/menu-wrapper";
import { profileIconLinks } from "./headerLink";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [user, setUser] = useState<{
    name: string | null;
    avatar: string | null;
  }>({
    name: null,
    avatar: null,
  });

  const fetchUserDetails = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setUser({ name: null, avatar: null });
      return;
    }

    try {
      const response = await fetch(
        "https://quickmeds.sndktech.online/users.profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data.");

      const data = await response.json();
      setUser({
        name: data?.user?.name || null,
        avatar: data?.user?.avatar
          ? `https://quickmeds.sndktech.online/${data.user.avatar}`
          : null,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser({ name: null, avatar: null });
    }
  };

  // Fetch user on mount
  useEffect(() => {
    fetchUserDetails();

    // Custom event listener for login state changes
    const handleLoginChange = () => {
      fetchUserDetails();
    };

    window.addEventListener("loginStateChanged", handleLoginChange);
    return () =>
      window.removeEventListener("loginStateChanged", handleLoginChange);
  }, []);

  const logoutHandler = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await fetch(
        "https://quickmeds.sndktech.online/users.logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Logout failed. Please try again.");

      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      setUser({ name: null, avatar: null });

      toast.success("Logout successful!");

      setShowLogoutPopup(false);
      setShowMenu(false);

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="relative cursor-pointer">
      <div
        className="flex items-center gap-2"
        onClick={() => setShowMenu(true)}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            <span className="text-l">👤</span>
          </div>
        )}
        {user.name ? ` ${user.name}` : "Hello, Login"}
      </div>

      <MenuWrapper
        open={showMenu}
        onClose={() => setShowMenu(false)}
        className="absolute shadow-product-card z-[50] rounded overflow-hidden bg-white flex flex-col top-full translate-y-[2.5%] left-0 -translate-x-1/3 w-fit"
      >
        {profileIconLinks.map((link) => (
          <div
            keyadoop={link.label}
            onClick={() => {
              router.push(link.link);
              setShowMenu(false);
            }}
            className="grid gap-3 hover:bg-body-gray text-lg whitespace-nowrap px-4 py-2 grid-cols-[max-content_1fr] items-center"
          >
            {link.Icon}
            {link.label}
          </div>
        ))}
        <div
          onClick={() => setShowLogoutPopup(true)}
          className="grid gap-3 hover:bg-body-gray text-lg whitespace-nowrap px-4 py-2 grid-cols-[max-content_1fr] items-center cursor-pointer"
        >
          <LogoutSvg /> Logout
        </div>
      </MenuWrapper>

      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
            <p className="text-lg font-medium">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={logoutHandler}
                className="text-gray-500 hover:text-gray-900 text-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="text-black font-medium text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
