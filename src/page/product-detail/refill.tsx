'use client';
import CustomSelect from '@/src/ui/select/custom-select';
import { SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';

const selectOptions = [
  { label: 'One Month', value: 'one-month' },
  { label: 'Two Month', value: 'two-month' },
  { label: 'Three Month', value: 'three-month' },
  { label: 'Four Month', value: 'four-month' },
  { label: 'Five Month', value: 'five-month' },
  { label: 'Six Month', value: 'six-month' },
  { label: 'One Year', value: 'one-year' },
];

const Refill = () => {
  const [isRefillOn, setIsRefillOn] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        {' '}
        <p className="text-shade  text-lg my-2"> Create Refill</p>
        <button
          onClick={() => setIsRefillOn(!isRefillOn)}
          className={`relative w-16 h-8 flex items-center p-1 rounded-full transition-colors duration-300 ${
            isRefillOn ? 'bg-green-500' : 'bg-gray-400'
          }`}
        >
          <span
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              isRefillOn ? 'translate-x-8' : 'translate-x-0'
            }`}
          />
          <span className="absolute left-2 text-xs text-white">
            {isRefillOn ? 'ON' : ''}
          </span>
          <span className="absolute right-2 text-xs text-white">
            {!isRefillOn ? 'OFF' : ''}
          </span>
        </button>
      </div>
      <p className="my-4">Select Refill Duration</p>
      <CustomSelect label="Select Duration">
        {selectOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </CustomSelect>
    </div>
  );
};

export default Refill;
