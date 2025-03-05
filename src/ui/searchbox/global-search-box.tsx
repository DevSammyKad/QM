import { cn } from "@/cn.config";
import SearchSvg from "@/src/icons/searchSvg";
import { ComponentPropsWithRef } from "react";

interface SearchProps extends ComponentPropsWithRef<"input"> {
  wrapperClass?: string;
}

export default function GlobalSearchBox(props: SearchProps) {
  const { className, wrapperClass, type = "search", ...rest } = props;
  return (
    <label
      className={cn(
        "flex-1   px-2 py-2 bg-white max-sm:flex-row-reverse flex items-center gap-2 shadow-product-card rounded-lg text-base  border-2 border-transparent focus-within:border-primary-500",
        wrapperClass
      )}
    >
      <SearchSvg className="" />
      <input
        className={cn(
          "w-full text-[17px] px-1 bg-white border-none outline-none ",
          className
        )}
        type={type}
        {...rest}
      />
    </label>
  );
}
