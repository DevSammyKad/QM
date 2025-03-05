import { cn } from "@/cn.config";
import { Button, ButtonProps } from "@nextui-org/button";

interface IconButtonProps extends ButtonProps {}

export default function IconButton(props: IconButtonProps) {
  const { className, children } = props;
  return (
    <Button
      isIconOnly
      className={cn(
        "bg-white p-[2px] absolute cursor-pointer top-[16px] right-[12px] w-auto min-w-0 h-auto",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
