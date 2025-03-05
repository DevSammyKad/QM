'use client';
import { cn } from '@/cn.config';
import EyeSvg from '@/src/icons/eyeSvg';
import GoogleIcon from '@/src/icons/googleicon';
import GoogleSvg from '@/src/icons/googleSvg';
import AuthPageLayout from '@/src/layouts/auth-page-layout';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import FormInput from '@/src/ui/form/form-input';
import { Button } from '@nextui-org/react';
import { OTPInput, SlotProps } from 'input-otp';
import { useState } from 'react';
import Api from '../../utils/Api';
import { header } from '../../utils/Api';
import DialogWrapper from '@/src/ui/dialog-wrapper.tsx/dialog-wrapper';
import CrossSvg from '@/src/icons/crossSvg';
import LoginWithPassword from '../login-with-password/LoginWithPassword';
import ResetPassword from '../reset-password/ResetPassword';
import CheckMail from '../check-mail/CheckMail';
import CreateNewPassword from '../CreateNewPassword';

type PopupStep = 'login' | 'resetPassword' | 'checkMail' | 'newPassword' | null;
// const usePopupManagement = () => {
//   const [popupStep, setPopupStep] = useState<PopupStep>(null);

//   const openPopup = (step: PopupStep) => setPopupStep(step);
//   const closePopup = () => setPopupStep(null);

//   return { popupStep, openPopup, closePopup };
// };

export default function Login() {
  // const [enterOtp, setEnterOtp] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [enterOtp, setEnterOtp] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [popupStep, setPopupStep] = useState<PopupStep>(null);

  const openPopup = (step: PopupStep) => {
    console.log('Opening popup:', step);
    setPopupStep(step);
  };

  // Function to close popup
  const closePopup = () => {
    console.log('Closing popup');
    setPopupStep(null);
  };
  const sendOtp = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true); // Start loading state
    setError(''); // Clear previous error

    localStorage.setItem('phoneNumber', phoneNumber);

    try {
      const response = await fetch(Api.Login, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          countryCode: '91', // You can replace this if you want dynamic country codes
          phoneNumber: phoneNumber,
        }),
      });

      const data = await response.json();

      if (data.status) {
        setEnterOtp(true); // Move to OTP input screen
        setLoading(false);
      } else {
        setError(data.message); // Show error message from the server
        setLoading(false);
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    setError(''); // Clear previous error

    const storedPhoneNumber = localStorage.getItem('phoneNumber');

    if (!storedPhoneNumber) {
      setError('Phone number not found. Please start the login process again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(Api.VerifyOtp, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          countryCode: '91', // Same country code as before
          phoneNumber: storedPhoneNumber,
          otp: otp, // Send the OTP entered by the user
        }),
      });

      const data = await response.json();

      if (data.status) {
        // OTP verification successful, you can handle the successful login here
        console.log('Logged in successfully!', data.token);
        alert('Logged in successfully!');
        // Redirect to the home page or authenticated area
      } else {
        setError(data.message); // Show error message if OTP verification fails
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageLayout>
      {enterOtp ? (
        <EnterOtp
          phoneNumber={phoneNumber}
          otp={otp}
          setOtp={setOtp}
          error={error}
          setError={setError}
          loading={loading}
          verifyOtp={verifyOtp}
        />
      ) : (
        <div className="grow p-12 flex flex-col justify-center items-center gap-7">
          <div className="flex flex-col gap-3 w-full">
            <h1 className="text-4xl text-primary-500 font-bold">Log in</h1>
            <p className="text-xl">Join the Quick Meds today</p>
          </div>
          <form
            action=""
            className="flex w-full flex-col gap-7"
            onSubmit={(e) => {
              e.preventDefault();
              sendOtp(); // Call sendOtp when form is submitted
            }}
          >
            <FormInput
              type="tel"
              placeholder="Phone +91"
              maxLength={10}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}{' '}
            {/* Display error */}
            <PrimaryButton
              type="submit"
              className="text-xl py-3 rounded-2xl"
              disabled={loading} // Disable the button if loading
            >
              {loading ? 'Sending...' : 'Log in'}
            </PrimaryButton>
          </form>
          <span className="text-2xl font-light text-shade ">Or</span>
          <Button
            className="bg-input-blue w-full py-4 h-[60px]"
            startContent={<GoogleSvg />}
          >
            Use Google Account
          </Button>
          <Button
            className="bg-input-blue w-full py-4 h-[60px]"
            onClick={() => openPopup('login')}
          >
            <EyeSvg />
            Use Password to Login{' '}
          </Button>
        </div>
      )}
      <DialogWrapper
        open={popupStep !== null}
        onClose={closePopup}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[55%] px-6 py-4 rounded-xl"
        backgroundScroll="hidden"
      >
        {popupStep === 'login' && (
          <LoginWithPassword setPopupStep={openPopup} closePopup={closePopup} />
        )}
        {popupStep === 'resetPassword' && (
          <ResetPassword setPopupStep={openPopup} closePopup={closePopup} />
        )}
        {popupStep === 'checkMail' && <CheckMail setPopupStep={openPopup} />}
        {popupStep === 'newPassword' && <CreateNewPassword />}
      </DialogWrapper>
    </AuthPageLayout>
  );
}

const EnterOtp = ({
  phoneNumber,
  otp,
  setOtp,
  error,
  setError,
  loading,
  verifyOtp,
}: {
  phoneNumber: string;
  otp: string;
  setOtp: (otp: string) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  verifyOtp: () => void;
}) => {
  return (
    <div className="grow p-12 flex flex-col justify-center items-center gap-7">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-4xl text-primary-500 font-bold">
          Verification code
        </h1>
        <p className="text-xl">Verification Code Sent to {phoneNumber} </p>
      </div>
      <form
        action=""
        className="flex w-full flex-col gap-7"
        onSubmit={(e) => {
          e.preventDefault();
          verifyOtp(); // Call verifyOtp when form is submitted
        }}
      >
        <OTPInput
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)} // Set OTP entered by the user
          render={({ slots }) => (
            <div className=" shadow-input bg-input-blue px-5 py-2 gap-3 grid grid-cols-6 grid-rows-1 rounded-2xl w-full pb-2">
              {slots.map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}{' '}
        {/* Show error message */}
        <PrimaryButton
          type="submit"
          className="text-xl py-3 rounded-2xl"
          disabled={loading} // Disable if loading
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </PrimaryButton>
      </form>
    </div>
  );
};

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'relative  h-10 mx-1',
        'text-shade text-2xl',
        'flex items-center justify-center',
        'border-b border-shade',
        { '': props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
