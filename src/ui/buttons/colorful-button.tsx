import { cn } from "@/cn.config";
import { Button, ButtonProps } from "@nextui-org/button";
import Link from "next/link";
import { ReactNode } from "react";

interface CustomButtonProps extends ButtonProps {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  bgColor?: string;
  titleDesc?: string;
  link: string;
}

export default function ColorfulButton(props: CustomButtonProps) {
  const {
    children,
    startIcon,
    titleDesc,
    endIcon,
    bgColor,
    link,
    className,
    ...rest
  } = props;
  return (
    <Link href={link}>
      <Button
        className={cn(
          " rounded-lg h-full  w-full  px-3 py-1 grid grid-cols-[max-content_1fr_max-content] gap-[10px]",
          className
        )}
        style={{ backgroundColor: bgColor }}
        {...rest}
      >
        {startIcon}
        <div className="flex flex-col items-start">
          <p className="text-start text-base font-medium"> {children}</p>
          {titleDesc && <span>{titleDesc}</span>}
        </div>

        {endIcon}
      </Button>
    </Link>
  );
}
