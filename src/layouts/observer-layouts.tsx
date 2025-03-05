"use client";
import { useEffect, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import CrossSvg from "../icons/crossSvg";
import { loginObserver } from "../observers/observable";
import Login from "../page/auth/login/login";
import DialogWrapper from "../ui/dialog-wrapper.tsx/dialog-wrapper";

export default function ObserverLayouts() {
  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const closeDialog = () => {
    setShow(false);
  };

  useEffect(() => {
    const showDialog = (show: boolean) => {
      setShow(show);
    };
    if (!isMobile) {
      loginObserver.subscribe(showDialog);
    }
    return () => {
      if (!isMobile) {
        loginObserver.unsubscribe(showDialog);
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <DialogWrapper
        open={show}
        onClose={closeDialog}
        closeBtnIcon={<CrossSvg />}
      >
        <Login />
      </DialogWrapper>
    </>
  );
}
