"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, MapPin, LocateFixed, Zap } from "lucide-react";
import { header } from "@/src/page/utils/Api";

const ChooseCityDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle city selection
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  // Fetch cities from API
  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://quickmeds.sndktech.online/PopularCity",
        {
          method: "GET",
          headers: header,
        }
      );
      const data = await response.json();

      if (data.status) {
        setCities(data.cities);
      } else {
        setError("Failed to fetch cities.");
      }
    } catch (err) {
      setError("Error fetching cities.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <span className="flex items-center space-x-4">
        <Zap color="yellow" fill="yellow" className="mr-3" /> Express delivery
        to
      </span>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-1 py-2 rounded-md shadow-sm"
      >
        <MapPin className="w-5 h-5 text-yellow-500" />
        <span className="font-medium text-gray-700">{selectedCity}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Use Current Location */}
          <div
            className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100"
            onClick={() => handleCitySelect("Using Current Location")}
          >
            <LocateFixed className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700">Use current location</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Popular Cities List */}
          <div className="p-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <p className="text-gray-500 text-sm px-3">Popular cities</p>
            {cities.map((city) => (
              <div
                key={city}
                onClick={() => handleCitySelect(city)}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
              >
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-gray-800">{city}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseCityDropDown;
