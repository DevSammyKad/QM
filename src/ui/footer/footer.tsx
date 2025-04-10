"use client"; // Ensure this component runs on the client side

import { useState } from "react";
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
import HelpPopup from "@/src/ui/footer/help/page"; // Import Help Popup
import CareerPopup from "@/src/ui/footer/career/page"; // Import Career Popup
import InvestorPopup from "@/src/ui/footer/investore/page";
import DeliveryPopup from "@/src/ui/footer/delivery/page";
import DonationPopup from "@/src/ui/footer/donation/page";

export default function Footer() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false); // State for Career popup
  const [investorOpen, setInvestorOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);

  return (
    <SiteLayout className="max-sm:py-5 flex flex-col gap-10">
      <DownloadSection />
      <div className="grid grid-cols-[minmax(max-content,_350px)_1fr] max-lg:grid-cols-1 max-lg:gap-10 gap-10 max-xl:gap-0">
        <div className="flex pl-3 max-xl:pl-0 max-sm:flex max-sm:items-center max-sm:justify-center">
          <QuickMedsLogoSvg
            width={200}
            className="max-sm:w-[250px] h-fit aspect-video"
          />
        </div>
        <div className="flex justify-between items-start pr-20 max-md:flex-wrap max-lg:gap-5 max-xl:pr-0">
          <LinkMapper links={navigationLinks} title="Navigation" />
          <LinkMapper links={featuresLinks} title="Features" />
          <LinkMapper links={servicesLinks} title="Services" />
          <LinkMapper
            links={otherLinks}
            title="Other"
            onHelpClick={() => setHelpOpen(true)}
            onCareerClick={() => setCareerOpen(true)}
            onInvestorClick={() => setInvestorOpen(true)}
            onDeliveryClick={() => setDeliveryOpen(true)}
            onDonationClick={() => setDonationOpen(true)}
          />
        </div>
      </div>

      <div className="flex justify-between lg:items-end max-sm:flex-col gap-3">
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
              <a
                href={socialData.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instaicon />
              </a>
            </Button>
            <Button isIconOnly className="bg-transparent">
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

      {/* Render HelpPopup */}
      <HelpPopup open={helpOpen} onClose={() => setHelpOpen(false)} />

      {/* Render CareerPopup */}
      <CareerPopup open={careerOpen} onClose={() => setCareerOpen(false)} />
      <InvestorPopup
        open={investorOpen}
        onClose={() => setInvestorOpen(false)}
      />
      <DeliveryPopup
        open={deliveryOpen}
        onClose={() => setDeliveryOpen(false)}
      />
      <DonationPopup
        open={donationOpen}
        onClose={() => setDonationOpen(false)}
      />
    </SiteLayout>
  );
}

// Updated LinkMapper to support Help and Career popups
const LinkMapper = ({
  links,
  title,
  onHelpClick,
  onCareerClick,
  onInvestorClick,
  onDeliveryClick,
  onDonationClick,
}) => {
  return (
    <div className="flex flex-col gap-3 text-xl max-sm:text-lg">
      <p className="capitalize font-bold pb-1">{title}</p>
      {links.map((link) =>
        link.label === "Help" ? (
          <span
            key={link.label}
            onClick={onHelpClick}
            className="cursor-pointer text-primary-500 hover:text-primary-600 transition border-b-2 w-fit border-transparent text-lg max-sm:text-base text-shade"
          >
            {link.label}
          </span>
        ) : link.label === "Investor" ? (
          <span
            key={link.label}
            onClick={onInvestorClick}
            className="cursor-pointer text-primary-500 hover:text-primary-600 transition border-b-2 w-fit border-transparent text-lg max-sm:text-base text-shade"
          >
            {link.label}
          </span>
        ) : link.label === "Donation" ? (
          <span
            key={link.label}
            onClick={onDonationClick}
            className="cursor-pointer text-primary-500 hover:text-primary-600 transition border-b-2 w-fit border-transparent text-lg max-sm:text-base text-shade"
          >
            {link.label}
          </span>
        ) : link.label === "Career" ? (
          <span
            key={link.label}
            onClick={onCareerClick}
            className="cursor-pointer text-primary-500 hover:text-primary-600 transition border-b-2 w-fit border-transparent text-lg max-sm:text-base text-shade"
          >
            {link.label}
          </span>
        ) : link.label === "Delivery" ? (
          <span
            key={link.label}
            onClick={onDeliveryClick}
            className="cursor-pointer text-primary-500 hover:text-primary-600 transition border-b-2 w-fit border-transparent text-lg max-sm:text-base text-shade"
          >
            {link.label}
          </span>
        ) : link.link ? (
          <Link
            href={link.link}
            key={link.label}
            className="capitalize hover:text-primary-500 transition hover:border-primary-500 border-b-2 w-fit border-transparent text-lg max-sm:text-base text-shade"
          >
            {link.label}
          </Link>
        ) : (
          <span
            key={link.label}
            className="text-shade text-lg max-sm:text-base"
          >
            {link.label}
          </span>
        )
      )}
    </div>
  );
};

const navigationLinks = [
  { label: "Home", link: Routes.home },
  { label: "Medicines", link: Routes.medicines },
  { label: "Health Products", link: Routes.healthProducts },
  { label: "Upload Prescription", link: Routes.myPrescriptions },
];

const featuresLinks = [
  { label: "My Prescription", link: Routes.myPrescriptions },
  { label: "My Orders", link: Routes.myOrders },
  { label: "My Lab Tests", link: Routes.myLabTests },
];

const servicesLinks = [
  { label: "FAQ", link: Routes.faq },
  { label: "Terms of Services", link: Routes.termsServices },
  { label: "Privacy Policy", link: Routes.privacyPolicy },
  { label: "Return & Refund", link: Routes.returnRefund },
];

const otherLinks = [
  { label: "Help" }, // Opens Help Popup
  { label: "Career" }, // Opens Career Popup
  { label: "Donation" },
  { label: "Investor" },
  { label: "Delivery" },
  { label: "Refills", link: Routes.refills },
];
