"use client";
import LogoutSvg from "@/src/icons/logoutSvg";
import UserSvg from "@/src/icons/userSvg";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MenuWrapper from "../dialog-wrapper.tsx/menu-wrapper";
import { profileIconLinks } from "./headerLink";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<{
    name: string | null;
    avatar: string | null;
  }>({
    name: null,
    avatar: null,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) return;

        const response = await fetch(
          "https://quickmeds.sndktech.online/users.profile", // Replace with actual API
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user data.");

        const data = await response.json();
        if (data?.user) {
          setUser({
            name: data.user.name || null,
            avatar: data.user.avatar
              ? `https://quickmeds.sndktech.online/${data.user.avatar}`
              : null, // Ensure full URL
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUser({ name: null, avatar: null });
      }
    };

    fetchUserDetails();
  }, []);

  const openMenuHandler = () => setShowMenu(true);
  const closeMenuHandler = () => setShowMenu(false);

  const clickOptionHandler = (link: string) => {
    router.push(link);
    closeMenuHandler();
  };

  const logoutHandler = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      // if (!authToken || !userId) {
      //   toast.info("You are already logged out.");
      //   return;
      // }

      const response = await fetch(
        "https://quickmeds.sndktech.online/users.logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "John Doe",
            phoneNumber: "1234567890",
            email: "john.doe@example.com",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }

      // Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");

      // Close the dropdown menu
      setShowMenu(false);

      // Show success toast
      toast.success("Logout successful!");

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="relative cursor-pointer">
      <div className="flex items-center gap-2" onClick={openMenuHandler}>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
            // onError={(e) => (e.currentTarget.src = "/default-avatar.png")} // Fallback image
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            ?
          </div> // Placeholder if no avatar
        )}
        {user.name ? `Hello, ${user.name}` : "Hello, Login"}
      </div>
      <MenuWrapper
        open={showMenu}
        onClose={closeMenuHandler}
        className="absolute shadow-product-card z-[99999] rounded overflow-hidden bg-white flex flex-col top-full translate-y-[2.5%] left-0 -translate-x-1/3 w-fit"
      >
        {profileIconLinks.map((link) => (
          <div
            key={link.label}
            onClick={() => clickOptionHandler(link.link)}
            className="grid gap-3 hover:bg-body-gray text-lg whitespace-nowrap px-4 py-2 grid-cols-[max-content_1fr] items-center"
          >
            {link.Icon}
            {link.label}
          </div>
        ))}
        <div
          onClick={logoutHandler}
          className="grid gap-3 hover:bg-body-gray text-lg whitespace-nowrap px-4 py-2 grid-cols-[max-content_1fr] items-center cursor-pointer"
        >
          <LogoutSvg /> Logout
        </div>
      </MenuWrapper>
    </div>
  );
}
