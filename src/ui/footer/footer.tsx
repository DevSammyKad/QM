import { Routes } from "@/routes.config";
import { socialData } from "@/social.config";
import FacebookIcon from "@/src/icons/facebookIcon";
import Instaicon from "@/src/icons/instaicon";
import LinkedinIcon from "@/src/icons/linkedinIcon";
import PhoneSvg from "@/src/icons/phoneSvg";
import QuickMedsLogoSvg from "@/src/icons/quickMedsLogoSvg";
import SiteLayout from "@/src/layouts/site-layout";
import DownloadSection from "@/src/page/home/download-section";
import { Button } from "@nextui-org/button";
import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
  return (
    <SiteLayout className=" max-sm:py-5 flex flex-col gap-10">
      <DownloadSection />
      <div className="grid grid-cols-[minmax(max-content,_350px)_1fr] max-lg:grid-cols-1 max-lg:gap-10 gap-10 max-xl:gap-0">
        <div className="flex pl-3 max-xl:pl-0 max-sm:flex max-sm:items-center max-sm:justify-center">
          <QuickMedsLogoSvg
            width={200}
            className="max-sm:w-[250px] h-fit aspect-video "
          />
        </div>
        <div className="flex justify-between items-start pr-20 max-md:flex-wrap max-lg:gap-5  max-xl:pr-0">
          <LinkMapper links={navigationLinks} title="navigation" />
          <LinkMapper links={featuresLinks} title="features" />
          <LinkMapper links={servicesLinks} title="Services" />
        </div>
      </div>
      <div className="flex  justify-between lg:items-end max-sm:flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-xl">Socials</p>
          <div className="flex items-center gap-3">
            <Button isIconOnly className="bg-transparent">
              <a
                href={socialData.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
            </Button>
            <Button isIconOnly className="bg-transparent">
              {" "}
              <a
                href={socialData.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instaicon />
              </a>
            </Button>
            <Button isIconOnly className="bg-transparent">
              {" "}
              <a
                href={socialData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon />
              </a>
            </Button>
          </div>
        </div>
        <Button startContent={<PhoneSvg />} className="bg-primary-100 rounded">
          Download App
        </Button>
      </div>
      <div className="flex max-sm:flex-col gap-2 justify-between text-xs text-shade">
        <span>
          All Rights Reserved by QuickMeds | Designed & Developed by Digilligent
          Marketing X Tech Solutions
        </span>
        <span>2024</span>
      </div>
    </SiteLayout>
  );
}

const LinkMapper = ({
  links,
  title,
}: {
  links: {
    label: string;
    link: string;
  }[];
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-3 text-xl max-sm:text-lg">
      <p className="capitalize font-bold pb-1">{title}</p>
      {links.map((link) => (
        <Link
          href={link.link}
          key={link.label}
          className="capitalize hover:text-primary-500 transition hover:border-primary-500 border-b-2 w-fit border-transparent text-lg max-sm:text-base text-shade"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

const navigationLinks = [
  { label: "home", link: Routes.home },
  { label: "Medicines", link: Routes.medicines },
  { label: "Health Products", link: Routes.healthProducts },
  { label: "Upload Prescription ", link: Routes.myPrescriptions },
];
const featuresLinks = [
  { label: "My Prescription", link: Routes.myPrescriptions },
  { label: "My Orders", link: Routes.myOrders },
  { label: "My Lab tests", link: Routes.myLabTests },
];
const servicesLinks = [
  { label: "faq", link: Routes.faq },
  { label: "term of services", link: Routes.termsServices },
  { label: "privacy policy", link: Routes.privacyPolicy },
  { label: "return-refund", link: Routes.returnRefund },
];
