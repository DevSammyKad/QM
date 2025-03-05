import AppleIcon from "@/src/icons/appleIcon";
import GoogleIcon from "@/src/icons/googleicon";
import { Button } from "@nextui-org/button";

export function DownloadAppButton({
  type,
}: {
  type: "App Store" | "Play Store";
}) {
  return (
    <Button
      fullWidth={true}
      startContent={type === "App Store" ? <AppleIcon /> : <GoogleIcon />}
      className={
        "bg-black text-white flex gap-1 px-3 py-5 rounded-lg items-center w-max justify-start border-2 border-gray-400"
      }
    >
      <div className="flex flex-col items-start gap-1">
        <p className="text-[9px] leading-none">
          {type === "App Store" ? "Download on the" : "GET IT ON"}
        </p>
        <p className="font-medium text-base leading-none">{type}</p>
      </div>
    </Button>
  );
}
