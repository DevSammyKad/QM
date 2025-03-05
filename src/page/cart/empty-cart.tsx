type Props = {};
import cartImg from "@/public/media/cart/cartimg.png";
import ImgTab from "@/src/components/imgTab/img-tab";
import { OutLinedButton } from "@/src/ui/buttons/buttons";
import Link from "next/link";

export default function EmptyCart({}: Props) {
  return (
    <div className=" mx-auto justify-center flex-col w-1/2 max-xl:w-2/3 max-sm:w-full gap-1 flex items-center">
      <ImgTab
        src={cartImg.src}
        alt="cart"
        className="w-[300px] max-sm:w-[200px]  object-cover"
      />
      <p className="text-center  text-2xl max-sm:text-xl">Your cart is empty</p>
      <p className="text-center text-shade max-sm:text-sm w-1/2 max-sm:w-[80%]">
        We have all the medicines and healthcare products that you need
      </p>
      <OutLinedButton className="w-1/2  max-sm:w-2/3 mt-5 ">
        <Link href={"/"}>Find medicines</Link>
      </OutLinedButton>
    </div>
  );
}
