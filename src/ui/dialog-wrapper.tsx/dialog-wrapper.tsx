'use client';
import { cn } from '@/cn.config';
import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type DialogProps = ComponentPropsWithoutRef<'div'> & {
  open: boolean;
  title?: string;
  backDropClasses?: string;
  closeOutsideClick?: boolean;
  closeBtnClasses?: string;
  titleClasses?: string;
  closeBtnIcon?: ReactNode;
  backgroundScroll?: 'hidden' | 'auto';
  onClose?: () => any | void;
};

export default function DialogWrapper(props: DialogProps) {
  const {
    open,
    children,
    onClose,
    title,
    backDropClasses,
    className,
    closeBtnClasses,
    closeBtnIcon,
    titleClasses,
    closeOutsideClick = false,
    backgroundScroll = 'hidden',

    ...rest
  } = props;
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onClose) return;

    const outsideClickHandler = (e: any) => {
      if (!closeOutsideClick) return;
      if (!dialogRef.current) return;
      if (dialogRef.current && !dialogRef.current.contains(e.target as any)) {
        onClose();
      }
    };
    if (open) {
      document?.addEventListener('mousedown', outsideClickHandler);
      document.body.style.overflow = backgroundScroll;
    } else {
      document?.removeEventListener('mousedown', outsideClickHandler);
      document.body.style.overflow = 'auto';
    }
    return () => {
      if (!onClose) return;
      document?.removeEventListener('mousedown', outsideClickHandler);
      document.body.style.overflow = 'auto';
    };
  }, [open, onClose, backgroundScroll, closeOutsideClick]);

  if (!open) return;

  return (
    <>
      {createPortal(
        <div
          className={cn(
            'bg-black/40  fixed w-svw h-svh top-0 left-0 z-[999999999] flex items-center justify-center ',
            backDropClasses
          )}
        >
          <div
            ref={dialogRef}
            className={cn('bg-white relative p-2 ', className)}
            {...rest}
          >
            <div className="flex items-center justify-between w-full h-fit pb-2">
              <p className={cn(' text-2xl font-semibold', titleClasses)}>
                {title}
              </p>
              <div
                onClick={onClose}
                className={cn(' cursor-pointer', closeBtnClasses)}
              >
                {closeBtnIcon}
              </div>
            </div>

            {children}
          </div>
        </div>,
        document?.body
      )}
    </>
  );
}
