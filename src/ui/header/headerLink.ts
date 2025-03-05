import { Routes } from "@/routes.config";
import AskQuestionSvg from "@/src/icons/askQuestionSvg";
import CartSvg from "@/src/icons/cartSvg";
import FaqSvg from "@/src/icons/faqSvg";
import HeartSvg from "@/src/icons/heartSvg";
import LabTestSvg from "@/src/icons/labTestSvg";
import Paper2Svg from "@/src/icons/paper2Svg";
import Paper3Svg from "@/src/icons/paper3Svg";
import PaperSvg from "@/src/icons/paperSvg";
import UserHealthSvg from "@/src/icons/userHealthSvg";
import UserSvg from "@/src/icons/userSvg";
import WalletSvg from "@/src/icons/walletSvg";

export const profileIconLinks: {
  label: string;
  link: string;
  Icon: JSX.Element;
}[] = [
  { label: "Edit profile", link: Routes.profile, Icon: UserSvg() },
  { label: "Wishlist    ", link: Routes.wishlist, Icon: HeartSvg({}) },
  {
    label: "My orders",
    link: Routes.myOrders,
    Icon: CartSvg({ fillColor: "#90A4AE" }),
  },
  { label: "My lab tests", link: Routes.myLabTests, Icon: LabTestSvg() },
  {
    label: "Wallet",
    link: Routes.wallet,
    Icon: WalletSvg({ fill: "#90A4AE" }),
  },
  { label: "Ask Question", link: Routes.askQuestion, Icon: AskQuestionSvg() },
  { label: "My health", link: Routes.myHealth, Icon: UserHealthSvg() },
  { label: "Terms & service", link: Routes.termsServices, Icon: PaperSvg({}) },
  { label: "FAQs    ", link: Routes.faq, Icon: FaqSvg() },
  { label: "Privacy policy", link: Routes.privacyPolicy, Icon: Paper2Svg() },
  {
    label: "Return and refund policy",
    link: Routes.returnRefund,
    Icon: Paper3Svg(),
  },
];
