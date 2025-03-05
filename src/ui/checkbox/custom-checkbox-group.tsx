"use client";
import { CheckboxGroup, CheckboxGroupProps } from "@nextui-org/checkbox";

interface CustomProps extends CheckboxGroupProps {}

export default function CustomCheckboxGroup(props: CustomProps) {
  const { children, ...rest } = props;
  return <CheckboxGroup {...rest}>{children}</CheckboxGroup>;
}
