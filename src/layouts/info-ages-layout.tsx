"use client";
import { Routes } from "@/routes.config";
import { Tab, Tabs } from "@nextui-org/tabs";
import { usePathname, useRouter } from "next/navigation";
import ImgTab from "../components/imgTab/img-tab";

const pageImages = {
  [Routes.faq]: "/media/pages/faqImg.png",
  [Routes.privacyPolicy]: "/media/pages/privacypolicy.png",
  [Routes.returnRefund]: "/media/pages/returnrefundimg.png",
  [Routes.termsServices]: "/media/pages/termsServiceImg.png",
};

export default function InfoPagesLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const tabHandler = (key: string) => {
    router.push(key);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <ImgTab
          src={pageImages[pathname]}
          alt={pathname.split("/")[1]}
          className="w-[600px] aspect-[3/2] object-contain "
        />
      </div>
      <div className="pt-3 max-lg:hidden leading-none border-b">
        <Tabs
          variant="underlined"
          selectedKey={pathname}
          className=""
          onSelectionChange={(key: any) => tabHandler(key)}
          classNames={{
            tab: "text-lg px-0 py-5",
            tabContent: "group-data-[selected=true]:text-primary-500",
            tabList: "gap-16 p-0",
            cursor: "w-full bg-primary-500",
          }}
        >
          <Tab key={Routes.termsServices} title="Terms & service" />
          <Tab key={Routes.privacyPolicy} title="Privacy policy" />
          <Tab key={Routes.returnRefund} title="Return and refund policy" />
          <Tab key={Routes.faq} title="FAQ's" />
        </Tabs>
      </div>
    </div>
  );
}
