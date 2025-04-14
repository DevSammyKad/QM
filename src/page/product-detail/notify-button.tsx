import { useState, useEffect } from "react";
import Image from "next/image";
import SendRequestSvg from "@/src/icons/sendRequestsvg";
import { PrimaryButton } from "@/src/ui/buttons/buttons";

type Props = {};

export default function NotifyButton({}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 2000); // Close after 2 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isOpen]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Out of stock message */}
      <p className="text-2xl max-sm:text-xl text-shade font-semibold">
        Out of stock
      </p>

      {/* Send Request Button */}
      <PrimaryButton
        startContent={<SendRequestSvg />}
        className="rounded-3xl py-2 mt-2 font-semibold justify-start"
        onClick={() => setIsOpen(true)}
      >
        <p className="flex-1 text-center">Send request</p>
      </PrimaryButton>

      {/* Popup Modal (With Image & Auto Close) */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative flex flex-col items-center">
            {/* SVG Image at the Top (Using <img>) */}
            <img
              src="/RatingReview.png" // ✅ Use relative path from /public folder
              alt="Rating Review"
              className="mb-4 w-[150px] h-auto"
            />

            {/* Modal Content */}
            <p className="mt-2 text-gray-800 text-center ">
              Your request has been sent.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
