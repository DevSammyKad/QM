'use client';
import { cn } from '@/cn.config';
import { Select, SelectProps } from '@nextui-org/select';

interface CustomProps extends SelectProps {}
export default function CustomSelect(props: CustomProps) {
  return (
    <Select
      className={cn('w-fit min-w-[280px] max-sm:min-w-[125px] ')}
      classNames={{
        trigger:
          'bg-white border border-border-shade rounded-md  max-sm:min-h-fit max-sm:h-8',
        base: '!m-0  ',
      }}
      labelPlacement="outside"
      {...props}
    ></Select>
  );
}
