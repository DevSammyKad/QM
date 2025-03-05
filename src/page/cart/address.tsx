import { Routes } from "@/routes.config";
import DeliverySvg from "@/src/icons/DeliverySvg";
import { OutLinedButton } from "@/src/ui/buttons/buttons";
import Link from "next/link";

export default function Address({ small }: { small?: boolean }) {
  return (
    <div className="w-full flex items-center gap-[5px] bg-transparent justify-between ">
      <div className="  flex flex-col">
        <div
          className={`flex items-center text-black gap-3 font-semibold   ${
            small ? "text-sm" : ""
          } `}
        >
          <DeliverySvg />
          Delivering to office
        </div>
        <span
          className={`text-sm ${
            small ? "text-xs" : ""
          } max-sm:text-xs text-shade`}
        >
          Street: C501, Vishal Apt, Behind Vishal Hall..
        </span>
      </div>
      <Link href={Routes.myAddresses}>
        <OutLinedButton
          size="sm"
          className="min-h-fit min-w-fit w-fit h-fit p-0 px-3 py-2 border font-semibold text-xs"
        >
          change
        </OutLinedButton>
      </Link>
    </div>
  );
}
