import { PrimaryButton } from '@/src/ui/buttons/buttons';
import React from 'react';

type PopupStep = 'login' | 'resetPassword' | 'checkMail' | 'newPassword' | null;

interface checkMailProps {
  setPopupStep: (step: PopupStep) => void;
}

const CheckMail = ({ setPopupStep }: checkMailProps) => {
  return (
    <div className="mx-auto  gap-10 p-10 ">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-center justify-center">
          <img
            src="/CheckEmail.png"
            alt="Expert Advice"
            className="object-cover w-[150px]  rounded-lg "
          />
        </div>{' '}
        <h1 className="text-4xl font-bold">Check your mail</h1>
        <p>We have sent a password recover instructions to your email.</p>
        <PrimaryButton
          type="submit"
          className="text-xl py-3 rounded-2xl"
          //   disabled={loading} // Disable the button if loading
          onClick={() => setPopupStep('checkMail')}
        >
          {/* {loading ? 'Sending...' : 'send Instructions'}
           */}
          Open Email App
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CheckMail;
