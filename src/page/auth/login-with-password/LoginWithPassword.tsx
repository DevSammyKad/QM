'use client';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import FormInput from '@/src/ui/form/form-input';
import Link from 'next/link';
import React, { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

type PopupStep = 'login' | 'resetPassword' | 'checkMail' | 'newPassword' | null;

interface PopupProps {
  closePopup: () => void;
  setPopupStep: (step: PopupStep) => void;
}

const LoginWithPassword = ({ closePopup, setPopupStep }: PopupProps) => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [loading, setLoading] = useState(false); // State to control the loading state
  const [error, setError] = useState(''); // State for errors
  const [token, setToken] = useState(''); // State to store the token after successful login
  const router = useRouter();

  // Handle the API call for login
  const handleLogin = async () => {
    setLoading(true); // Start loading
    setError(''); // Reset error message

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch(
        'https://quickmeds.sndktech.online/users.Newlogin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-authorization': 'RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph',
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Handle success response
        setToken(data.token); // Save token
        toast.success(data.message); // Show success toast
        router.push('/');
      } else {
        // Handle error response
        setError(data.message || 'An error occurred. Please try again.');
        toast.error(data.message || 'An error occurred. Please try again.'); // Show error toast
      }
    } catch (error) {
      setError('An error occurred. Please check your connection.');
      toast.error('An error occurred. Please check your connection.'); // Show error toast
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleResetPassword = () => {
    // Directly call setPopupStep to open reset password popup
    setPopupStep('resetPassword');
  };
  return (
    <div className="mx-auto  flex items-center gap-10 justify-between p-10 ">
      <div className="flex items-center justify-center">
        <img
          src="/loginWithPassword.png"
          alt="Expert Advice"
          className="object-cover w-[400px]  rounded-lg "
        />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-4xl font-bold">Log in</h1>
        <p>Welcome back to Quick Meds</p>
        <FormInput
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        <FormInput
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />

        <PrimaryButton
          type="button"
          className="text-xl py-3 rounded-2xl"
          onClick={handleLogin}
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Logging in...' : 'Log in'}
        </PrimaryButton>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex items-center justify-center flex-col gap-2">
          <PrimaryButton onClick={handleResetPassword}>
            Reset Password
          </PrimaryButton>
          <p className="text-gray-500">
            New to Quick Meds?{' '}
            <Link className="text-primary-500" href={'/'}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginWithPassword;
