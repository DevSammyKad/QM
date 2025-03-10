'use client';
import Api, { header } from '@/src/app/(pages)/utils/Api';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

interface LabTestSchedulerProps {
  onClose: () => void;
  labTestId: string | number;
}

interface PatientType {
  id: number;
  userId: number;
  image: string;
  age: number;
  patientName: string;
  dob: string;
  gender: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

const currentUserId = 1; // Replace with actual userId if dynamic

const LabTestScheduler = ({ onClose, labTestId }: LabTestSchedulerProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);
  const [patients, setPatients] = useState<PatientType[]>([]);

  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(
    null
  );
  const [showAddNewPatient, setShowAddNewPatient] = useState(false);

  // New patient form
  const [newPatient, setNewPatient] = useState({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    image: 'https://avatar.iran.liara.run/public/32', // Default image if needed
    userId: currentUserId, // Replace with actual userId if dynamic
  });

  const router = useRouter();

  // Mock data - replace with API calls
  const dateOptions = [
    { id: 'today', label: 'Today', slots: 5 },
    { id: 'tomorrow', label: 'Tomorrow', slots: 12 },
    { id: 'dayafter', label: 'Sat, 02 mar', slots: 7 },
  ];

  const timeSlots = [
    { id: 1, time: '1:00 pm - 2:00 pm', price: 19 },
    { id: 2, time: '2:00 pm - 3:00 pm', price: 19 },
    { id: 3, time: '3:00 pm - 4:00 pm', price: 19 },
    { id: 4, time: '4:00 pm - 5:00 pm', price: 19 },
    { id: 5, time: '5:00 pm - 6:00 pm', price: 19 },
  ];

  // Fetch patients - replace with actual API call
  const fetchPatients = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(Api.LabTestPatientsByUserID(1), {
        method: 'GET', // Use "POST" if required
        headers: header,
      });

      console.log('response', response);

      if (!response.ok) {
        setError('Failed to fetch patients');
        return;
      }

      const data = await response.json();
      console.log('Fetched Patients Data:', data);

      if (data.patientes) {
        setPatients(data.patientes); // Use correct key from API response
      } else {
        setError('No patients found');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Error occurred while fetching patients');
    } finally {
      setLoading(false); // End loading
    }
  }, []);

  useEffect(() => {
    if (step === 2) {
      fetchPatients();
    }
  }, [step, fetchPatients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  // Handle adding a new patient - replace with actual API call
  const handleAddPatient = async () => {
    try {
      setLoading(true);
      setError(null);

      const currentYear = new Date().getFullYear();
      const dobYear = currentYear - parseInt(newPatient.age, 10);
      const dob = `${dobYear}-01-01`; // Default to Jan 1st

      const patientData = {
        ...newPatient,
        dob, // Add DOB to match API format
      };

      const response = await fetch(Api.LabTestAddPatient, {
        method: 'POST',
        headers: {
          ...header,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData), // Send JSON data
      });

      if (!response.ok) {
        // Improved error handling: get the error message from the API
        const errorData = await response.json(); // Try to parse the JSON error
        setError(
          `Failed to add patient: ${response.status} - ${
            errorData?.message || response.statusText
          }`
        );
        return;
      }

      const addedPatientResponse = await response.json(); // Get the API response
      console.log('API Response:', addedPatientResponse);

      if (addedPatientResponse.status === true) {
        // Extract patient ID from the response
        const addedPatient: PatientType = {
          ...patientData,
          id: addedPatientResponse.id,
          isDefault: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          age: parseInt(patientData.age, 10),
        };

        setPatients([...patients, addedPatient]); // Use patients array instead of patientData
        setSelectedPatient(addedPatient);
        setShowAddNewPatient(false);

        // Reset form
        setNewPatient({
          patientName: '',
          age: '',
          gender: '',
          phone: '',
          email: '',
          image: 'https://avatar.iran.liara.run/public/32',
          userId: currentUserId,
        });
      } else {
        setError(
          `Failed to add patient: ${
            addedPatientResponse.message || 'Unknown error'
          }`
        );
      }
    } catch (err) {
      console.error('Error adding patient:', err);
      setError('Failed to add patient');
    } finally {
      setLoading(false);
    }
  };

  // Handle final submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!selectedPatient) {
        setError('Please select a patient before proceeding.');
        setLoading(false);
        return;
      }

      if (!selectedDate || !selectedTimeSlot) {
        setError('Please select a date and time slot.');
        setLoading(false);
        return;
      }

      const bookingData = {
        userId: currentUserId, // Replace with actual userId
        labTestId: labTestId, // Replace with actual labTestId
        patientId: selectedPatient, // Assuming you store selected patients in an array
        slot_date: selectedDate, // Replace with selected slot date
        slot_time:
          timeSlots.find((slot) => slot.id === selectedTimeSlot)?.time || '', // Replace with selected slot time
        slot_price:
          timeSlots.find((slot) => slot.id === selectedTimeSlot)?.price || 0, // Replace with actual price
      };

      const response = await fetch(Api.LabTestBooking, {
        method: 'POST',
        headers: {
          ...header,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          `Failed to schedule: ${errorData?.message || response.statusText}`
        );
        return;
      }

      const result = await response.json();
      console.log('Booking Success:', result);

      if (result.status === true) {
        router.push(`/lab-test-booking-summary/${result.id}`); // Redirect to tracking page
      } else {
        setError(`Failed to schedule: ${result.message || 'Unknown error'}`);
      }
    } catch (err) {
      setError('Failed to schedule lab test');
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (step === 1 && !selectedTimeSlot) {
      setError('Please select a time slot');
      return;
    }

    if (step === 2 && !selectedPatient && !showAddNewPatient) {
      setError('Please select a patient or add a new one');
      return;
    }

    if (step === 2 && showAddNewPatient) {
      handleAddPatient();
      return;
    }

    if (step === 2) {
      handleSubmit();
      return;
    }

    setError(null);
    setStep(step + 1);
  };

  // Render step 1: Schedule date and time
  const renderDateTimeStep = () => (
    <>
      <h2 className="text-2xl font-semibold mb-6">Schedule date and time</h2>

      <div className="mb-6">
        <h3 className="text-gray-600 mb-3">Day</h3>
        <div className="flex gap-3">
          {dateOptions.map((option) => (
            <button
              key={option.id}
              className={`border rounded-lg p-4 text-center flex-1 ${
                selectedDate === option.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-300'
              }`}
              onClick={() => setSelectedDate(option.id)}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-gray-500 text-sm">{option.slots} slots</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-gray-600 mb-3">Time Slot</h3>
        <div className="space-y-3">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between border-b border-gray-100 pb-3"
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="timeSlot"
                  className="h-5 w-5 text-teal-500 mr-3"
                  checked={selectedTimeSlot === slot.id}
                  onChange={() => setSelectedTimeSlot(slot.id)}
                />
                <span>{slot.time}</span>
              </label>
              <span className="text-gray-500">₹{slot.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="text-gray-600 mb-1">Please note:</div>
        <div className="text-gray-500 text-sm">
          Overnight fasting (8-12 hrs) is required. Do not eat or drink anything
          except water before...
          <button className="text-orange-500 font-medium">read more</button>
        </div>
      </div>
    </>
  );

  // Render step 2: Choose Patient
  const renderChoosePatientStep = () => (
    <>
      <h2 className="text-2xl font-semibold mb-6">Choose Patient</h2>

      {!showAddNewPatient ? (
        <>
          <div className="space-y-3 mb-6">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`border rounded-lg p-4 cursor-pointer ${
                  selectedPatient?.id === patient.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200'
                }`}
                onClick={() =>
                  setSelectedPatient(
                    patients.find((p) => p.id === patient.id) || null
                  )
                }
              >
                <div className="font-medium">{patient.patientName}</div>
                <div className="text-gray-500 text-sm">
                  Birth Date •{patient.dob} {patient.gender}
                </div>
              </div>
            ))}
          </div>

          <button
            className="w-full border border-teal-500 text-teal-500 rounded-lg p-3 font-medium"
            onClick={() => setShowAddNewPatient(true)}
          >
            + Add New Patient
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={newPatient.patientName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={newPatient.age}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter age"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={newPatient.gender === 'male'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={newPatient.gender === 'female'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={newPatient.gender === 'other'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Other
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={newPatient.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={newPatient.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter email address"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 border border-gray-300 rounded-lg p-3"
              onClick={() => setShowAddNewPatient(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-teal-500 text-white rounded-lg p-3"
              onClick={handleAddPatient}
            >
              Add Patient
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg w-full max-w-xl overflow-auto h-[70%] ">
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
          >
            <X />
          </button>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {step === 1 && renderDateTimeStep()}
          {step === 2 && renderChoosePatientStep()}

          <div className="mt-6">
            <button
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium"
              onClick={handleContinue}
              disabled={loading}
              type="button"
            >
              {loading ? 'Loading...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestScheduler;
