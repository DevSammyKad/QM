import { Routes } from '@/routes.config';
import CartSvg from '@/src/icons/cartSvg';
import PhoneSvg from '@/src/icons/phoneSvg';
import QuickMedsLogoSvg from '@/src/icons/quickMedsLogoSvg';
import SiteLayout from '@/src/layouts/site-layout';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import HamburgerMenu from './components/HamburgerMenu';
import { HeaderLink } from './header-link';
import Notification from './notification';
import User from './user';
import ChooseCityDropDown from './ChooseCityDropDown';

export default function Header() {
  return (
    <>
      <header className="w-full max-lg:sticky max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:z-[99999999] relative bg-body-gray">
        <SiteLayout className="py-0 max-sm:py-0  overflow-visible ">
          <div className="flex w-full py-2 items-center justify-between">
            <div className="flex items-center gap-8 max-lg:hidden">
              <Link href={Routes.home}>
                <QuickMedsLogoSvg
                  width={170}
                  height={70}
                  className="max-sm:w-[100px] max-sm:h-[40px]"
                />
              </Link>
              <ChooseCityDropDown />
            </div>
            <div className="flex max-lg:hidden  items-center gap-8 text-[13px] font-light">
              <Button
                startContent={<PhoneSvg />}
                className="bg-primary-100 rounded"
              >
                Download App
              </Button>
              <User />
              <Notification />
              <Link
                href={Routes.cart}
                className=" cursor-pointer flex items-center gap-2"
              >
                <CartSvg fillColor="#90A4AE" />
                Cart
              </Link>
            </div>
            <HamburgerMenu />
          </div>
        </SiteLayout>
      </header>
      <div className="flex items-center max-lg:hidden bg-body-gray justify-center py-3 sticky border border-border-shade w-full top-0 z-10">
        <nav className="w-1/2 mx-auto flex justify-between gap-5 items-center">
          <HeaderLink href={Routes.home}>Home</HeaderLink>
          <HeaderLink href={Routes.medicines}>Medicines</HeaderLink>
          <HeaderLink href={Routes.labTest}>Lab tests</HeaderLink>
          <HeaderLink href={Routes.healthProducts}>Health products</HeaderLink>
          <HeaderLink href={Routes.myPrescriptions}>
            Upload Prescription
          </HeaderLink>
        </nav>
      </div>
    </>
  );
}
