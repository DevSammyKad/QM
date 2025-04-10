'use client';
import { cn } from '@/cn.config';
import AuthPageLayout from '@/src/layouts/auth-page-layout';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import FormInput from '@/src/ui/form/form-input';
import { OTPInput, SlotProps } from 'input-otp';

export default function Signup() {
  return (
    <AuthPageLayout>
      <div className="grow p-12 flex flex-col items-center gap-7">
        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-4xl text-primary-500 font-bold">Sign up</h1>
          <p className="text-xl">Join the Quick Meds today</p>
        </div>
        <form action="" className="flex w-full flex-col gap-7">
          <FormInput type="text" placeholder="Name" />
          <FormInput type="tel" placeholder="Phone +91" maxLength={10} />
          <FormInput type="email" placeholder="Email" />
          <FormInput type="password" placeholder="Password" />
          <PrimaryButton className="text-xl py-3 rounded-2xl">
            Sign Up
          </PrimaryButton>
        </form>
        <span className="text-2xl font-light text-shade ">Or</span>
      </div>
    </AuthPageLayout>
  );
}

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
