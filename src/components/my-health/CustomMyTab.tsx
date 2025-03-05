"use client";
import useMediaQuery from "@/src/hooks/useMediaQuery";
import { Button, ButtonProps } from "@nextui-org/button";

interface CustomMyTabProps extends ButtonProps {
  selected: boolean;
}
export const CustomMyTab = (props: CustomMyTabProps) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const { selected, children, variant, color, ...rest } = props;
  return (
    <Button
      size={isMobile ? "sm" : "md"}
      variant={selected ? "solid" : "bordered"}
      color={selected ? "primary" : "secondary"}
      {...rest}
    >
      {children}
    </Button>
  );
};
