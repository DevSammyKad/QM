import { cn } from "@/cn.config";
import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {}

export default function FormInput(props: InputProps) {
  const { type = "text", className, ...rest } = props;
  return (
    <input
      type={type}
      className={cn(
        "bg-input-blue px-3 py-3 text-lg shadow-input rounded-2xl w-full border-none outline-none",
        className
      )}
      {...rest}
    />
  );
}

interface TextareaProps extends ComponentProps<"textarea"> {}

export function FormTextarea(props: TextareaProps) {
  const { className, rows = 1, ...rest } = props;
  return (
    <textarea
      rows={rows}
      className={cn(
        "bg-input-blue px-3 py-3 text-lg shadow-input rounded-lg w-full border-none outline-none",
        className
      )}
      {...rest}
    />
  );
}
