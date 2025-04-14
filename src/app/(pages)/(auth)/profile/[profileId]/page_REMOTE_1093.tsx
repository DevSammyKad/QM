"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import ArrowIcon from "@/src/icons/arrowIcon";
import BackButtonWrapper from "@/src/ui/wrappers/BackButtonWrapper";
import FormInput from "@/src/ui/form/form-input";

const ProfilePage = ({ params }: { params: { profileId: string } }) => {
  const { profileId } = params;

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem("authToken");

        const response = await axios.get(
          "https://quickmeds.sndktech.online/users.profile",
          {
            headers: {
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const userData = response.data.user;
        setProfile((prev) => ({
          ...prev,
          name: userData.name || "",
          phone: userData.phone || "",
          email: userData.email || "",
          avatar: userData.avatar || "/user.png",
        }));
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar: imageUrl,
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem("authToken");

      const requestData = {
        name: profile.name,
        phone: profile.phone,
        email: profile.email,
        age: profile.age,
        gender: profile.gender,
        avatar: profile.avatar,
      };

      const response = await axios.put(
        "https://quickmeds.sndktech.online/users.update",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-5">
        <div className="flex items-center gap-4">
          <BackButtonWrapper>
            <ArrowIcon
              className="cursor-pointer rotate-90"
              width={15}
              height={15}
            />
          </BackButtonWrapper>
          <h2 className="text-lg font-semibold">Edit Profile</h2>
        </div>

        <div className="relative mt-4">
          <div className="w-full h-20 bg-teal-500 absolute top-0 left-0 rounded-t-lg"></div>
          <div className="flex flex-col items-center mt-10">
            <Avatar
              src={profile.avatar || "/user.png"}
              className="w-24 h-24 border-4 border-white shadow-md"
            />
            <p
              className="text-sm text-gray-600 mt-2 cursor-pointer"
              onClick={handleImageUpload}
            >
              Change Picture
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Username</label>
            <FormInput
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone number</label>
            <FormInput
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              type="tel"
              maxLength={10}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <FormInput
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Age</label>
            <FormInput
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <FormInput
              value={profile.gender}
              onChange={(e) =>
                setProfile({ ...profile, gender: e.target.value })
              }
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-center">
            <Button
              className="w-full py-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
