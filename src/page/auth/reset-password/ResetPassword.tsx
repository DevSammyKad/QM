import { OutLinedButton, PrimaryButton } from '@/src/ui/buttons/buttons';
import FormInput from '@/src/ui/form/form-input';
import React from 'react';

type PopupStep = 'login' | 'resetPassword' | 'checkMail' | 'newPassword' | null;

interface ResetPasswordProps {
  setPopupStep: (step: PopupStep) => void;
  closePopup: () => void;
}

const ResetPassword = ({ setPopupStep, closePopup }: ResetPasswordProps) => {
  return (
    <div className="mx-auto flex items-center gap-10 justify-between p-10 ">
      <div className="flex items-center justify-center">
        <img
          src="/loginWithPassword.png"
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
          value={''}
          //   onChange={(e) => setEmail(e.target.value)}
        />

        <PrimaryButton
          type="submit"
          className="text-xl py-3 rounded-2xl"
          //   disabled={loading} // Disable the button if loading

          onClick={() => setPopupStep('newPassword')}
        >
          {/* {loading ? 'Sending...' : 'send Instructions'}
           */}
          Send Instructions
        </PrimaryButton>
        <OutLinedButton
          variant="light"
          className="text-xl py-3 rounded-2xl"
          onClick={closePopup}
        >
          Cancel
        </OutLinedButton>
      </div>
    </div>
  );
};

export default ResetPassword;
