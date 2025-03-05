import { Providers } from "@/src/providers";
import Footer from "@/src/ui/footer/footer";
import Header from "@/src/ui/header/header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <Providers>
      <Header />
      <main className="w-full bg-body-gray relative">{children}</main>
      <Footer />
    </Providers>
  );
}
