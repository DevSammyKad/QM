import { ReactNode } from "react";
import BgCircleA from "../icons/bg-circlea";
import BgCircleB from "../icons/bg-circleb";
import AuthSidePanel from "../page/auth/auth-side-panel";

export default function AuthPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-[77vw] h-[75vh] relative">
      <BgCircleB className="absolute bottom-0 left-0" />
      <BgCircleA className="absolute top-0 right-0" />
      <AuthSidePanel />
      {children}
    </div>
  );
}
