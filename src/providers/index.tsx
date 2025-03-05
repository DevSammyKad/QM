"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryProvider from "./QueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer />
      <QueryProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </QueryProvider>
    </>
  );
}
