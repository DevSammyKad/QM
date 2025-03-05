import { cn } from '@/cn.config';
import { Button, ButtonProps } from '@nextui-org/react';

interface PrimaryButtonProps extends ButtonProps {}

export function PrimaryButton(props: PrimaryButtonProps) {
  const { className, children, ...restProps } = props;

  return (
    <Button
      className={cn(
        'w-full font-semibold h-auto py-2 leading-5 bg-primary-500 text-base text-white rounded-lg',
        className
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
}

interface OutLinedButtonProps extends ButtonProps {}

export function OutLinedButton(props: OutLinedButtonProps) {
  const { className, children, ...restProps } = props;

  return (
    <Button
      variant="bordered"
      className={cn(
        'w-full font-medium  h-auto  py-2 leading-5 border-secondary-500 text-secondary-500 text-base  rounded-lg',
        className
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
}
