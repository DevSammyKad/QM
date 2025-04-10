import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Routes } from '@/routes.config';


const MyPrescriptionsButton = () => {
  const router = useRouter(); // Initialize router

  const handleUploadClick = () => {
    router.push(Routes.myPrescriptions); // Navigate to the Upload Prescription page
  };
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <button             onClick={() => router.push("../my-health/my-prescriptions")}
 className="bg-primary-500 text-white py-2 px-4 rounded-lg">
        My Prescriptions
      </button>
      <button onClick={handleUploadClick} className="bg-primary-500 text-white py-2 px-4 rounded-lg">
        Add New Prescriptions
      </button>
    </div>
  );
};

export default MyPrescriptionsButton;
