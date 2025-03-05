"use client";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

type DialogProps = ComponentPropsWithoutRef<"div"> & {
  open: boolean;
  onClose: () => any | void;
};

export default function MenuWrapper(props: DialogProps) {
  const { open, children, onClose, ...rest } = props;
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outsideClickHandler = (e: any) => {
      if (!dialogRef.current) return;
      if (dialogRef.current && !dialogRef.current.contains(e.target as any)) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("mousedown", outsideClickHandler);
    } else {
      document.removeEventListener("mousedown", outsideClickHandler);
    }
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [open, onClose]);

  if (!open) return;
  return (
    <div ref={dialogRef} {...rest}>
      {children}
    </div>
  );
}
