'use client';
import Api, { header } from '@/src/app/(pages)/utils/Api';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

interface LabTestSchedulerProps {
  onClose: () => void;
  labTestId: number;
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

interface DateSlot {
  date: string;
  slotsCount: number;
}

interface TimeSlot {
  id: number;
  time: string;
  price: number;
}

// Constants
const currentUserId = 1; // Replace with actual userId when implemented
const DEFAULT_AVATAR = 'https://avatar.iran.liara.run/public/32';

const LabTestScheduler = ({ onClose, labTestId }: LabTestSchedulerProps) => {
  const router = useRouter();

  // State management
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Date & Time selection
  const [dateSlots, setDateSlots] = useState<DateSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);

  // Patient selection
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
    image: DEFAULT_AVATAR,
    userId: currentUserId,
  });

  // Format date display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();

    // Clone today to avoid mutation issues
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  // API Calls
  const fetchDateSlots = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        Api.LabTestGetSlotsDateByLabTestId(labTestId),
        {
          method: 'GET',
          headers: header,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch date slots: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched Date Slots:', data);

      if (data.slots && Array.isArray(data.slots)) {
        setDateSlots(data.slots);
      } else {
        setError('No available date slots found');
      }
    } catch (err) {
      console.error('Error fetching date slots:', err);
      setError('Failed to load available dates');
    } finally {
      setLoading(false);
    }
  }, [labTestId]);

  const fetchTimeSlots = useCallback(
    async (date: string) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${Api.LabTestGetSlotsTimeByLabTestId(labTestId)}&date=${date}`,
          {
            method: 'GET',
            headers: header,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch time slots: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Time Slots:', data);

        if (data.slots && Array.isArray(data.slots)) {
          setTimeSlots(data.slots);
        } else {
          setError('No time slots available for the selected date');
        }
      } catch (err) {
        console.error('Error fetching time slots:', err);
        setError('Failed to load available time slots');
      } finally {
        setLoading(false);
      }
    },
    [labTestId]
  );

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(Api.LabTestPatientsByUserID(currentUserId), {
        method: 'GET',
        headers: header,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch patients: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched Patients:', data);

      if (data.patientes && Array.isArray(data.patientes)) {
        setPatients(data.patientes);
      } else {
        setError('No patients found');
      }
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect hooks
  useEffect(() => {
    if (step === 1) {
      fetchDateSlots();
    } else if (step === 2) {
      fetchPatients();
    }
  }, [step, fetchDateSlots, fetchPatients]);

  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots(selectedDate);
      setSelectedTimeSlot(null); // Reset time slot when date changes
    }
  }, [selectedDate, fetchTimeSlots]);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setError(null);
  };

  const handleTimeSlotSelection = (slotId: number) => {
    console.log('Selected time slot ID:', slotId);
    setSelectedTimeSlot(slotId);
    setError(null);
  };

  const handlePatientSelection = (patient: PatientType) => {
    setSelectedPatient(patient);
    setError(null);
  };

  // Add new patient
  const handleAddPatient = async () => {
    // Validation
    if (!newPatient.patientName.trim()) {
      setError('Patient name is required');
      return;
    }

    if (!newPatient.age || isNaN(parseInt(newPatient.age, 10))) {
      setError('Valid age is required');
      return;
    }

    if (!newPatient.gender) {
      setError('Gender is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currentYear = new Date().getFullYear();
      const dobYear = currentYear - parseInt(newPatient.age, 10);
      const dob = `${dobYear}-01-01`; // Default to Jan 1st of birth year

      const patientData = {
        ...newPatient,
        dob,
      };

      const response = await fetch(Api.LabTestAddPatient, {
        method: 'POST',
        headers: {
          ...header,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Failed to add patient: ${response.status} - ${
            errorData?.message || response.statusText
          }`
        );
      }

      const result = await response.json();
      console.log('Add Patient Response:', result);

      if (result.status === true) {
        // Create the patient object from the response
        const addedPatient: PatientType = {
          id: result.id,
          userId: currentUserId,
          patientName: patientData.patientName,
          age: parseInt(patientData.age, 10),
          gender: patientData.gender,
          dob: patientData.dob,
          image: patientData.image,
          isDefault: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Update state
        setPatients([...patients, addedPatient]);
        setSelectedPatient(addedPatient);
        setShowAddNewPatient(false);

        // Reset form
        setNewPatient({
          patientName: '',
          age: '',
          gender: '',
          phone: '',
          email: '',
          image: DEFAULT_AVATAR,
          userId: currentUserId,
        });
      } else {
        throw new Error(
          `Failed to add patient: ${result.message || 'Unknown error'}`
        );
      }
    } catch (err: any) {
      console.error('Error adding patient:', err);
      setError(err.message || 'Failed to add patient');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedPatient) {
      setError('Please select a patient');
      return;
    }

    if (!selectedDate) {
      setError('Please select a date');
      return;
    }

    if (selectedTimeSlot === null) {
      setError('Please select a time slot');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const selectedSlot = timeSlots.find(
        (slot) => slot.id === selectedTimeSlot
      );
      if (!selectedSlot) {
        throw new Error('Invalid time slot selected');
      }

      const bookingData = {
        userId: currentUserId,
        labTestId,
        patientId: selectedPatient.id,
        slot_date: selectedDate,
        slot_time: selectedSlot.time,
        slot_price: selectedSlot.price,
      };

      console.log('Submitting booking data:', bookingData);

      const response = await fetch(Api.LabTestBooking, {
        method: 'POST',
        headers: {
          ...header,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Failed to schedule: ${errorData?.message || response.statusText}`
        );
      }

      const result = await response.json();
      console.log('Booking Success:', result);

      if (result.status === true) {
        router.push(`/lab-test-booking-summary/${result.id}`);
      } else {
        throw new Error(
          `Failed to schedule: ${result.message || 'Unknown error'}`
        );
      }
    } catch (err: any) {
      console.error('Error submitting booking:', err);
      setError(err.message || 'Failed to schedule lab test');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!selectedDate) {
        setError('Please select a date');
        return;
      }

      if (selectedTimeSlot === null) {
        setError('Please select a time slot');
        return;
      }

      setStep(2);
      setError(null);
    } else if (step === 2) {
      if (showAddNewPatient) {
        handleAddPatient();
      } else if (!selectedPatient) {
        setError('Please select a patient or add a new one');
      } else {
        handleSubmit();
      }
    }
  };

  // UI Components
  const renderDateTimeStep = () => (
    <>
      <h2 className="text-2xl font-semibold mb-6">Schedule date and time</h2>

      {/* Date selection */}
      <div className="mb-6">
        <h3 className="text-gray-600 mb-3">Day</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {dateSlots.map((slot, index) => (
            <button
              key={index}
              className={`border rounded-lg p-4 text-center flex-1 min-w-[100px] ${
                selectedDate === slot.date
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-300'
              }`}
              onClick={() => handleDateSelection(slot.date)}
            >
              <div className="font-medium">{formatDate(slot.date)}</div>
              <div className="text-gray-500 text-sm">
                {slot.slotsCount} slots
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Time slot selection */}
      <div className="mb-4">
        <h3 className="text-gray-600 mb-3">Time Slot</h3>
        {selectedDate ? (
          timeSlots.length > 0 ? (
            <div className="space-y-3">
              {timeSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3"
                >
                  <label className="flex items-center cursor-pointer w-full">
                    <input
                      type="radio"
                      name="timeSlot"
                      className="h-5 w-5 text-teal-500 mr-3"
                      checked={selectedTimeSlot === slot.id}
                      onChange={() => handleTimeSlotSelection(slot.id)}
                      value={slot.id}
                    />
                    <span className="flex-1">{slot.time}</span>
                    {slot.price && (
                      <span className="text-gray-500">₹{slot.price}</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">
              No time slots available for selected date
            </div>
          )
        ) : (
          <div className="text-gray-500 italic">Please select a date first</div>
        )}
      </div>

      {/* Notes section */}
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

  const renderChoosePatientStep = () => (
    <>
      <h2 className="text-2xl font-semibold mb-6">Choose Patient</h2>

      {!showAddNewPatient ? (
        <>
          {/* Patient list */}
          <div className="space-y-3 mb-6">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <div
                  key={patient.id}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedPatient?.id === patient.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => handlePatientSelection(patient)}
                >
                  <div className="font-medium">{patient.patientName}</div>
                  <div className="text-gray-500 text-sm">
                    {patient.age} years • {patient.gender}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">No patients found</div>
            )}
          </div>

          {/* Add new patient button */}
          <button
            className="w-full border border-teal-500 text-teal-500 rounded-lg p-3 font-medium"
            onClick={() => setShowAddNewPatient(true)}
          >
            + Add New Patient
          </button>
        </>
      ) : (
        /* New patient form */
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="patientName"
                value={newPatient.patientName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter full name"
                required
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
                required
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

          {/* Form buttons */}
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
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Patient'}
            </button>
          </div>
        </div>
      )}
    </>
  );

  // Main component render
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl overflow-auto h-[70%]">
        <div className="p-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
          >
            <X />
          </button>

          {/* Error display */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Step content */}
          {step === 1 && renderDateTimeStep()}
          {step === 2 && renderChoosePatientStep()}

          {/* Action button */}
          <div className="mt-6">
            <button
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium"
              onClick={handleContinue}
              disabled={loading}
              type="button"
            >
              {loading
                ? 'Processing...'
                : step === 2 && !showAddNewPatient
                ? 'Book Appointment'
                : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestScheduler;
