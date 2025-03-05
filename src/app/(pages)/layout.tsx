import BreadCrumbs from "@/src/components/breadcrumbs/breadcrumbs";
import SiteLayout from "@/src/layouts/site-layout";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <SiteLayout className="py-5">
      <BreadCrumbs />
      {children}
    </SiteLayout>
  );
}
