import React from 'react';

const MyPrescriptionsButton = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <button className="bg-primary-500 text-white py-2 px-4 rounded-lg">
        My Prescriptions
      </button>
      <button className="bg-primary-500 text-white py-2 px-4 rounded-lg">
        Add New Prescriptions
      </button>
    </div>
  );
};

export default MyPrescriptionsButton;
