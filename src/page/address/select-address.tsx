'use client';
import { cn } from '@/cn.config';
import { RadioGroup, RadioProps, useRadio } from '@nextui-org/radio';
import { VisuallyHidden } from '@nextui-org/react';
import { MouseEvent, ReactNode } from 'react';

type Props = {
  addresses: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  }[];
};
export default function SelectAddress({ addresses }: Props) {
  return (
    <RadioGroup
      className=""
      classNames={{
        wrapper: 'grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1',
      }}
    >
      {addresses.map((address) => (
        <CustomRadio
          subChild={() => AddressDescription({ address })}
          key={address.name}
          value={address.name}
        >
          {address.name}
        </CustomRadio>
      ))}
    </RadioGroup>
  );
}

const AddressDescription = ({
  address,
}: {
  address: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
}) => {
  const editAddressHandler = (event: MouseEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const removeAddressHandler = (event: MouseEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <div className="text-sm text-shade">
      <p>Street: {address.street}</p>
      <p>City: {address.city}</p>
      <p>State/Province: {address.state}</p>
      <p>Zip-code: {address.zip}</p>
      <p>Phone:{address.phone}</p>
      <div className="flex pt-2 items-center gap-5 text-base font-semibold justify-start">
        <div
          onClick={editAddressHandler}
          className="text-primary-500 font-semibold cursor-pointer hover:opacity-70 active:opacity-50  transition-all"
        >
          Edit
        </div>
        <div
          onClick={removeAddressHandler}
          className="text-primary-500 font-semibold cursor-pointer hover:opacity-70 active:opacity-50  transition-all"
        >
          Remove
        </div>
      </div>
    </div>
  );
};

interface CustomRadioProps extends RadioProps {
  subChild: () => ReactNode;
}

export const CustomRadio = (props: CustomRadioProps) => {
  const { subChild, ...restProps } = props;
  const {
    Component,
    children,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(restProps);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        'flex flex-col group   gap-2 bg-white  rounded-lg',
        'tap-highlight-transparent cursor-pointer border-2 border-border-shade rounded-lg  p-4',
        'data-[selected=true]:border-primary'
      )}
    >
      <div className="flex items-center gap-2 ">
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <span {...getWrapperProps()}>
          <span {...getControlProps()} />
        </span>
        <div
          {...getLabelWrapperProps()}
          className="bg-[#F4F4F4] px-3 py-1 text-shade rounded-md"
        >
          {children && <span {...getLabelProps()}>{children}</span>}
        </div>
      </div>
      {subChild && subChild()}
    </Component>
  );
};
