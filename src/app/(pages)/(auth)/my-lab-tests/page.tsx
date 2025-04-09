'use client';
import GlobalSearchBox from '@/src/ui/searchbox/global-search-box';
import { User } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MyHeader = dynamic(() => import('@/src/components/my-health/MyHeader'), {
  loading: () => <p>Loading...</p>,
});

const appointments = [
  {
    id: 1,
    status: 'Upcoming',
    date: 'Today, 12-1pm',
    testName: 'Comprehensive gold full body checkup with smart report',
    patientName: 'Iron man',
    state: 'confirmed',
    notes:
      'Overnight fasting (8-10 hrs) is required. Do not eat or drink anything except water before...',
    detail:
      'Phlebotomist details will be updated 2 hours before collection time.',
  },
  {
    id: 2,
    status: 'Completed',
    date: '02-15-2024',
    testName: 'Comprehensive gold full body checkup with smart report',
    patientName: 'Iron man',
    state: 'completed',
  },
  {
    id: 3,
    status: 'Cancelled',
    date: '',
    testName: 'Comprehensive gold full body checkup with smart report',
    patientName: 'Iron man',
    state: 'cancelled',
    cancellationMessage:
      'Order cancelled. If youve paid online, refund will be initiated shortly.',
  },
];

// Filter appointments based on active tab

export default function page() {
  const [activeTab, setActiveTab] = useState('All');

  // Static data
  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

  const filteredAppointments =
    activeTab === 'All'
      ? appointments
      : appointments.filter((app) => app.status === activeTab);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-medium">Search your lab tests</p>
        <GlobalSearchBox placeholder="Search" />
        <div className=" p-4 bg-white">
          {/* Tabs */}
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm ${
                  activeTab === tab
                    ? tab === 'All'
                      ? 'bg-teal-500 text-white'
                      : 'border border-orange-400 text-orange-400'
                    : 'border border-gray-300 text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`rounded-lg overflow-hidden ${
                  appointment.status === 'Upcoming'
                    ? 'bg-sky-50'
                    : appointment.status === 'Completed'
                    ? 'bg-sky-50'
                    : 'bg-white'
                }`}
              >
                {/* Status header */}
                {appointment.status && (
                  <div className="px-4 py-2 bg-sky-50 text-sm text-sky-800">
                    {appointment.status}{' '}
                    {appointment.date && `· ${appointment.date}`}
                  </div>
                )}

                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                      {/* Using a placeholder for the test image */}
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-xs text-gray-500">
                          Test Image
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Test</p>
                      <p className="text-sm font-medium mb-2">
                        {appointment.testName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16  rounded-lg mr-4 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <User />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Patient</p>
                      <p className="text-sm text-gray-600">
                        {appointment.patientName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {/* Status specific information */}
                  {appointment.state === 'confirmed' && (
                    <>
                      <div className="mb-4">
                        <p className="text-teal-500 font-medium">
                          Collection slot confirmed
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.detail}
                        </p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">
                          Please note:
                        </p>
                        <p className="text-xs text-gray-500">
                          {appointment.notes}
                          <span className="text-orange-500 ml-1">
                            read more
                          </span>
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 py-2 border border-orange-400 text-orange-500 rounded-md text-sm">
                          Track booking
                        </button>
                        <button className="flex-1 py-2 bg-teal-500 text-white rounded-md text-sm">
                          See details
                        </button>
                      </div>
                    </>
                  )}

                  {appointment.state === 'completed' && (
                    <button className="w-full py-3 border border-orange-400 text-orange-500 rounded-md text-sm">
                      See details
                    </button>
                  )}

                  {appointment.state === 'cancelled' && (
                    <>
                      <div className="mb-4">
                        <p className="text-red-500 font-medium">
                          Booking cancelled
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.cancellationMessage}
                        </p>
                      </div>
                      <button className="w-full py-3 border border-orange-400 text-orange-500 rounded-md text-sm">
                        Book again
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
