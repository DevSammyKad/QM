"use client";
import { cn } from "@/cn.config";
import EyeSvg from "@/src/icons/eyeSvg";
import GoogleIcon from "@/src/icons/googleicon";
import GoogleSvg from "@/src/icons/googleSvg";
import AuthPageLayout from "@/src/layouts/auth-page-layout";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import FormInput from "@/src/ui/form/form-input";
import { Button } from "@nextui-org/react";
import { OTPInput, SlotProps } from "input-otp";
import { useState, useEffect } from "react";
import Api from "../../utils/Api";
import { header } from "../../utils/Api";
import DialogWrapper from "@/src/ui/dialog-wrapper.tsx/dialog-wrapper";
import CrossSvg from "@/src/icons/crossSvg";
import LoginWithPassword from "../login-with-password/LoginWithPassword";
import ResetPassword from "../reset-password/ResetPassword";
import CheckMail from "../check-mail/CheckMail";
import CreateNewPassword from "../CreateNewPassword";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "../signup/Signup";

type PopupStep =
  | "login"
  | "resetPassword"
  | "checkMail"
  | "newPassword"
  | "signup"
  | null;
// const usePopupManagement = () => {
//   const [popupStep, setPopupStep] = useState<PopupStep>(null);

//   const openPopup = (step: PopupStep) => setPopupStep(step);
//   const closePopup = () => setPopupStep(null);

//   return { popupStep, openPopup, closePopup };
// };

export default function Login() {
  // const [enterOtp, setEnterOtp] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [enterOtp, setEnterOtp] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupStep, setPopupStep] = useState<PopupStep>(null);
  const [timer, setTimer] = useState(30);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  
  const router = useRouter();

  const openPopup = (step: PopupStep) => {
    console.log("Opening popup:", step);
    setPopupStep(step);
  };

  // Function to close popup
  const closePopup = () => {
    console.log("Closing popup");
    setPopupStep(null);
  };

  const handleEditPhoneNumber = () => {
    // Open the login popup when clicking the pencil icon
    openPopup("login");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (enterOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setIsSubmitDisabled(true); // Enable submit button after 30 seconds
            setIsResendDisabled(false); // Enable resend OTP button
            clearInterval(interval);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Clean up the interval when component unmounts or timer changes
  }, [enterOtp, timer]);

  const sendOtp = async () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setError("");

    localStorage.setItem("phoneNumber", phoneNumber);

    // const authToken = localStorage.getItem("authToken"); // Get token from localStorage
    // if (!authToken) {
    //   setError("Authentication token missing. Please log in again.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(Api.Login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          // Authorization: `Bearer ${authToken}`, // Use stored authToken
        },
        body: JSON.stringify({
          countryCode: "91",
          phoneNumber: phoneNumber,
        }),
      });

      const data = await response.json();

      if (data.status) {
        setEnterOtp(true);
        setTimer(30);
        setIsSubmitDisabled(false);
        setIsResendDisabled(true);
        setOtp("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const authToken = localStorage.getItem("authToken"); // Get token from localStorage

    if (!storedPhoneNumber) {
      setError("Phone number not found. Please start the login process again.");
      setLoading(false);
      return;
    }

    // if (!authToken) {
    //   setError("Authentication token missing. Please log in again.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(Api.VerifyOtp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          // Authorization: `Bearer ${authToken}`, // Use stored authToken
        },
        body: JSON.stringify({
          countryCode: "91",
          phoneNumber: storedPhoneNumber,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (data.status) {
        console.log("Logged in successfully!", data.token);
        toast.success(data.message); // Show success toast
        localStorage.setItem("authToken", data.token); // Store new authToken
        localStorage.setItem("userId", data.userId); // Store userId
        router.push("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleResendOtp = () => {
    sendOtp();
     setOtp("");
    setTimer(30);
    setIsSubmitDisabled(true); // Disable submit button when OTP is sent
    setIsResendDisabled(true); // Disable resend OTP button
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
          timer={timer}
          isSubmitDisabled={isSubmitDisabled}
          handleResendOtp={handleResendOtp}
          setEnterOtp={setEnterOtp}
          isResendDisabled={isResendDisabled} // Pass resend OTP state
          handleEditPhoneNumber={handleEditPhoneNumber}
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
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Display error */}
            <PrimaryButton
              type="submit"
              className="text-xl py-3 rounded-2xl"
              disabled={loading} // Disable the button if loading
            >
              {loading ? "Sending..." : "Log in"}
            </PrimaryButton>
          </form>
          <span className="text-xl font-light text-shade ">Or</span>
          <Button
            className="bg-input-blue w-full py-6 h-[80px]"
            startContent={<GoogleSvg />}
          >
            Use Google Account
          </Button>
          <Button
            className="bg-input-blue w-full py-6 h-[60px]"
            onClick={() => openPopup("login")}
          >
            <EyeSvg />
            Use Password to Login{" "}
          </Button>
          <p className="text-gray-500">
            New to Quick Meds?{" "}
            <button
              className="text-primary-500"
              onClick={() => openPopup("signup")}
            >
              Register
            </button>
          </p>
        </div>
      )}
      <DialogWrapper
        open={popupStep !== null}
        onClose={closePopup}
        closeBtnIcon={<CrossSvg />}
        className={cn(
          "px-8 py-6 rounded-xl",
          popupStep === "signup"
            ? "md:w-[80%] md:h-[90vh]" // Smaller size for signup popup
            : "md:w-[60%] md:h-[80vh]" // Default size for other popups
        )}
        backgroundScroll="hidden"
      >
        {popupStep === "login" && (
          <LoginWithPassword setPopupStep={openPopup} closePopup={closePopup} />
        )}
        {popupStep === "resetPassword" && (
          <ResetPassword setPopupStep={openPopup} closePopup={closePopup} />
        )}
        {popupStep === "checkMail" && <CheckMail setPopupStep={openPopup} />}
        {popupStep === "newPassword" && <CreateNewPassword />}
        {popupStep === "signup" && <Signup closePopup={closePopup} />}
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
  timer,
  isSubmitDisabled,
  handleResendOtp,
  isResendDisabled,
  handleEditPhoneNumber,
}: {
  phoneNumber: string;
  otp: string;
  setOtp: (otp: string) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  verifyOtp: () => void;
  timer: number;
  isSubmitDisabled: boolean;
  handleResendOtp: () => void;
  isResendDisabled: boolean;
  handleEditPhoneNumber: () => void;
}) => {
  
  return (
    <div className="grow p-12 flex flex-col justify-center items-center gap-7">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-4xl text-primary-500 font-bold">
          Verification code
        </h1>
          <button onClick={handleEditPhoneNumber} className="text-primary-500 flex items-center gap-2">
          <p className="text-xl flex items-center">Verification Code Sent to {phoneNumber} 
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
            className="ml-2"
            fill="currentColor">
    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"></path>
</svg> */}
          </p>

        </button>
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
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Show error message */}
        <PrimaryButton
          type="submit"
          className="text-xl py-3 rounded-2xl"
          disabled={isSubmitDisabled || loading} // Disable if loading
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </PrimaryButton>
      </form>
      <button
        onClick={handleResendOtp}
        disabled={isResendDisabled}
        onClick={handleResendOtp}
        className="text-primary-500 mt-4"
      >
         Resend OTP {timer > 0 && `(${timer}s)`} {/* Display timer */}
      </button>
    </div>
  );
};

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative  h-10 mx-1",
        "text-shade text-2xl",
        "flex items-center justify-center",
        "border-b border-shade",
        { "": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
