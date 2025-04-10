"use client";
import BgCircleA from "@/src/icons/bg-circlea";
import BgCircleB from "@/src/icons/bg-circleb";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import FormInput from "@/src/ui/form/form-input";
import { Lock } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { header } from "../utils/Api";

const CreateNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleResetPassword = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!newPassword || !confirmPassword) {
      setErrorMessage("New password and confirm password are required.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://quickmeds.sndktech.online/users.resetPassword",
        {
          method: "POST",
          headers: header,
          body: JSON.stringify({ newPassword, confirmPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password has been successfully reset.");
        router.push("/cart");
      } else {
        // setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      // setErrorMessage("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative  items-center justify-center">
      <BgCircleB className="absolute bottom-0 left-0" />
      <BgCircleA className="absolute top-0 right-0" />
      <div className="flex flex-col items-center justify-center gap-6 p-8 bg-white shadow-lg rounded-lg w-120 z-10">
        <h1 className="text-3xl font-bold text-center">Create New Password</h1>
        <p className="text-center text-gray-600">
          Your new password must be different from previously used passwords.
        </p>

        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center space-x-3 w-full">
            <Lock />
            <FormInput
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              maxLength={20}
              className="w-full"
            />
          </div>

          <div className="flex items-center space-x-3 w-full">
            <Lock />
            <FormInput
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              maxLength={20}
              className="w-full"
            />
          </div>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}

        <PrimaryButton
          type="button"
          className="text-lg py-3 w-full rounded-2xl"
          disabled={loading || !newPassword || !confirmPassword}
          onClick={handleResetPassword}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CreateNewPassword;
