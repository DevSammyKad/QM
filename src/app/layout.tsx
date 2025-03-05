import AppLayout from "@/src/layouts/appLayout";
import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

const inter = Albert_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "QUICMEDS",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
