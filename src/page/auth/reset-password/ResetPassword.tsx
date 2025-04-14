import { OutLinedButton, PrimaryButton } from '@/src/ui/buttons/buttons';
import FormInput from '@/src/ui/form/form-input';
import React, { useState, useEffect } from 'react';
import { header } from '../../utils/Api';

type PopupStep = 'login' | 'resetPassword' | 'newPassword' | null;

interface ResetPasswordProps {
  setPopupStep: (step: PopupStep) => void;
  closePopup: () => void;
}

const ResetPassword = ({ setPopupStep, closePopup }: ResetPasswordProps) => {
  const [email, setEmail] = useState(''); // state to hold email input
  const [loading, setLoading] = useState(false); // for showing loading state
  const [errorMessage, setErrorMessage] = useState(''); // to handle errors
  const [successMessage, setSuccessMessage] = useState(''); // to show success message
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Function to handle password reset request
  const handleResetPasswordRequest = async () => {
    if (cooldown > 0) return; 
    setLoading(true); // start loading
    setErrorMessage(''); // reset error message
    setSuccessMessage(''); // reset success message

    try {
      const response = await fetch('https://quickmeds.sndktech.online/users.resetPasswordRequest', {
        method: 'POST',
        headers: header, 
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setSuccessMessage('Password reset instructions sent to your email.');
        // setPopupStep('checkMail'); // Show a "check mail" screen
        setCooldown(30);
      } else {
        // Error
        // setErrorMessage(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error sending password reset request:', error);
      // setErrorMessage('Failed to send reset instructions. Please try again.');
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="mx-auto flex items-center gap-10 justify-between p-10 ">
      <div className="flex items-center justify-center">
        <img
          src="/ResetPassword.png"
          alt="Expert Advice"
          className="object-cover w-[400px]  rounded-lg "
        />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-4xl font-bold">Reset Password</h1>
        <p>
          Enter the email associated with your account and we'll send an email
          with instructions to reset your password.
        </p>
        <FormInput
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Show error or success message */}
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}

        {/* Submit button */}
        <PrimaryButton
          type="button"
          className="text-xl py-3 rounded-2xl"
          disabled={loading || !email || cooldown > 0}
          onClick={handleResetPasswordRequest}
        >
            {loading ? "Sending..." : "Send Instructions"}
        </PrimaryButton>

       {/* Countdown Timer for Re-send */}
       {cooldown > 0 && (
            <p className="text-gray-500 text-xs text-center">
              Re-send Instructions in <span className="font-bold">0:{cooldown < 10 ? `0${cooldown}` : cooldown}</span>
            </p>
          )}
      </div>
    </div>
  );
};

export default ResetPassword;
