import ArrowIcon from "@/src/icons/arrowIcon";
import EmailSvg from "@/src/icons/emailSvg";
import PhoneSvg from "@/src/icons/phoneSvg";
import UserSvg from "@/src/icons/userSvg";
import WalletSvg from "@/src/icons/walletSvg";
import BackButtonWrapper from "@/src/ui/wrappers/BackButtonWrapper";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Switch } from "@nextui-org/switch";

export default function page() {
  return (
    <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
      <div className="h-full w-full flex flex-col shadow-product-card bg-white rounded-lg">
        <div className="flex items-center px-5 py-2 gap-4">
          <BackButtonWrapper>
            <ArrowIcon
              arrowFillColor="#F26522"
              className="cursor-pointer rotate-90"
              width={15}
              height={15}
            />
          </BackButtonWrapper>
          Profile
        </div>
        <div className="relative p-5">
          <div className="w-full h-1/2 bg-primary-500 absolute top-0 left-0 "></div>
          <div className="flex flex-col items-center w-fit gap-2">
            <Avatar
              src="/user.png"
              className="w-36 h-36 cursor-pointer text-large"
            />
            <p className="text-xs font-semibold cursor-pointer">
              Change Profile
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 pb-3">
          <form className="flex items-center px-5 max-sm:px-1 gap-4 max-sm:gap-1 py-2 justify-between">
            <UserSvg />
            <label className="flex-1 max-sm:pl-2">
              <p className="text-shade text-sm">User Name</p>
              <input
                type="text"
                className={`border-none w-full outline-none `}
                defaultValue={"Ankit"}
              />
            </label>
            <Button
              color="secondary"
              variant="light"
              className="font-semibold  max-sm:w-fit max-sm:min-w-fit  "
            >
              Edit
            </Button>
          </form>
          <Divider />
          <form className="flex items-center px-5 max-sm:px-1 gap-4 max-sm:gap-1 py-2 justify-between">
            <PhoneSvg />
            <label className="flex-1 max-sm:pl-2">
              <p className="text-shade text-sm">Phone number</p>
              <input
                type="tel"
                maxLength={10}
                className={`border-none w-full outline-none `}
                defaultValue={"8295451564"}
              />
            </label>
            <Button
              color="secondary"
              variant="light"
              className="font-semibold  max-sm:w-fit max-sm:min-w-fit  "
            >
              Edit
            </Button>
          </form>
          <Divider />
          <form className="flex items-center px-5 max-sm:px-1 gap-4 max-sm:gap-1 py-2 justify-between">
            <EmailSvg />
            <label className="flex-1 max-sm:pl-2">
              <p className="text-shade text-sm">Email</p>
              <input
                type="email"
                className={`border-none w-full outline-none `}
                defaultValue={"Fawadkhanexample@gmail.com"}
              />
            </label>
            <Button
              color="secondary"
              variant="light"
              className="font-semibold  max-sm:w-fit max-sm:min-w-fit  "
            >
              Edit
            </Button>
          </form>
          <Divider />
          <div className="flex justify-end w-full px-3 ">
            <Button
              className="text-sm w-fit h-fit !rounded py-1"
              variant="light"
              color="default"
            >
              Reset password
            </Button>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex flex-col justify-between gap-3">
        <div className="bg-white flex items-center justify-between gap-5 p-4 shadow-product-card rounded-lg">
          <WalletSvg fill="#F26522" width={30} height={30} />
          <div className="flex-1">
            <p className="font-semibold text-lg">Wallet</p>
            <p className="text-shade">You have ₹800 in your wallet</p>
          </div>
          <ArrowIcon
            arrowFillColor="#F26522"
            className="cursor-pointer -rotate-90"
            width={15}
            height={15}
          />
        </div>
        <div className="bg-white flex gap-5 p-4 items-center justify-between shadow-product-card rounded-lg">
          <div className="flex-1">
            <p className="font-semibold text-lg">
              Subscribe to marketing email
            </p>
            <p className="text-shade">
              We will send you the latest offers, best products and updated
              medical information to your email address
            </p>
          </div>
          <Switch defaultSelected={false} color="secondary" />
        </div>
        <div className="bg-white flex gap-5 p-4 items-center justify-between shadow-product-card rounded-lg">
          <div className="flex-1">
            <p className="font-semibold text-lg">Get whatsapp notifications</p>
            <p className="text-shade">
              We will send you the latest notifications related to your orders
              and lab reports to your mobile number
            </p>
          </div>
          <Switch defaultSelected color="secondary" />
        </div>
        <div className="bg-white flex-1 shadow-product-card flex flex-col items-center justify-center gap-3 p-5 text-2xl max-xl:text-xl text-shade rounded-lg">
          <p className="w-2/3 max-xl:w-3/4 flex flex-col">
            <span>Making healthcare</span>
            <span>Understandable, Accessible & Affordable</span>
          </p>
          <p className="w-2/3 max-xl:w-3/4 ">
            Made with <span className="text-red-600">❤</span> by Quick Meds{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
