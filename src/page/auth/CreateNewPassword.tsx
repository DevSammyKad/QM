import BgCircleA from '@/src/icons/bg-circlea';
import BgCircleB from '@/src/icons/bg-circleb';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import FormInput from '@/src/ui/form/form-input';
import { Lock } from 'lucide-react';
import React from 'react';

const CreateNewPassword = () => {
  return (
    <div className="flex  relative">
      <BgCircleB className="absolute bottom-0 left-0" />
      <BgCircleA className="absolute top-0 right-0" />

      <div className="flex flex-col items-center justify-center gap-10 p-10 z-10">
        <h1 className="text-4xl font-bold">Create New Password</h1>
        <p>Your new password must be different from previous used passwords.</p>
        <div className="flex items-center space-x-3 w-full">
          <Lock />
          <FormInput
            type="text"
            placeholder="Enter new password"
            maxLength={10}
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* {error && <p className="text-red-500">{error}</p>}{' '} */}
        <div className="flex items-center space-x-3 w-full">
          <Lock />
          <FormInput
            type="text"
            placeholder="Confirm password"
            maxLength={10}
            //   value={Confirm}
            //   onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <PrimaryButton>Reset Password</PrimaryButton>
      </div>
    </div>
  );
};

export default CreateNewPassword;
