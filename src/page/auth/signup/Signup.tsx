"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { cn } from "@/cn.config";
import AuthPageLayout from "@/src/layouts/auth-page-layout";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import FormInput from "@/src/ui/form/form-input";
import { Button } from "@nextui-org/react";
import GoogleSvg from "@/src/icons/googleSvg";
// import EyeSvg from "@/src/icons/eyeSvg";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "91",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [popupStep, setPopupStep] = useState("signup");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.phone.match(/^\d{10}$/)) {
      toast.error("Phone number must be 10 digits");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://quickmeds.sndktech.online/users.reg",
        formData,
        {
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.userId) {
        toast.success("Signup successful!");
        router.push("/");
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageLayout>
      <div className="grow p-12 flex flex-col items-center gap-4">
        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-4xl text-primary-500 font-bold">Sign up</h1>
          <p className="text-xl">Join the Quick Meds today</p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7">
          <FormInput
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormInput
            type="tel"
            name="phone"
            placeholder="Phone (10 digits)"
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
          />
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            value={formData.password}
            onChange={handleChange}
          />
          <PrimaryButton
            className="text-xl py-3 rounded-2xl"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </PrimaryButton>
        </form>
      </div>
    </AuthPageLayout>
  );
}
