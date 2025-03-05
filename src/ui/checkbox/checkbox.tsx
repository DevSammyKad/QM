"use client";
import { Checkbox, CheckboxProps } from "@nextui-org/checkbox";

interface CustomCheckboxProps extends CheckboxProps {}

export default function CustomCheckbox(props: CustomCheckboxProps) {
  const { children, color, ...rest } = props;
  return (
    <Checkbox {...rest} color="secondary">
      {children}
    </Checkbox>
  );
}
