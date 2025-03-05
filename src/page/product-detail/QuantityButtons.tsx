import { cn } from "@/cn.config";
import { Button } from "@nextui-org/button";

type Props = {
  decreaseHandler: () => void;
  increaseHandler: () => void;
  quantity: number;
  wrapperClass?: string;
};

export default function QuantityButtons({
  decreaseHandler,
  increaseHandler,
  quantity,
  wrapperClass,
}: Props) {
  return (
    <div
      className={cn(
        "flex justify-between items-center min-w-[120px] gap-2 font-medium text-sm rounded-lg bg-[#90A4AE1A] ",
        wrapperClass
      )}
    >
      <Button
        onClick={decreaseHandler}
        isIconOnly
        className="bg-transparent min-h-fit h-fit py-2 max-[500px]:py-1 text-xl max-[500px]:text-base font-bold"
      >
        -
      </Button>
      {quantity < 10 ? `0${quantity}` : quantity}
      <Button
        isIconOnly
        onClick={increaseHandler}
        className="bg-transparent min-h-fit h-fit py-2 max-[500px]:py-1 text-xl max-[500px]:text-base font-semibold"
      >
        +
      </Button>
    </div>
  );
}
