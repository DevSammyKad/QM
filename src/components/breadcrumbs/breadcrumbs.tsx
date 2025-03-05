"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  currentPathName?: string;
};

export default function BreadCrumbs({ currentPathName }: Props) {
  const pathname = usePathname();

  const paths = pathname.split("/");

  function createCrumbs(paths: string[]) {
    const crumbs: string[] = [];
    let path = "";
    paths.forEach((_path, index) => {
      path += index === 0 ? `${_path}` : `/${_path}`;
      crumbs.push(path);
    });

    return crumbs;
  }

  const breads = createCrumbs(paths);

  const myBreads = breads.splice(0, paths.length - 1);
  if (breads[0] === "/") return;
  return (
    <div className="w-full pb-5 max-sm:hidden text-center flex gap-1 justify-start items-center">
      {myBreads.map((path, index) => (
        <div key={index} className="flex items-center gap-1">
          <Link
            href={path || "/"}
            className="capitalize text-sm text-shade  max-sm:text-[10px]"
          >
            {path === ""
              ? "Home"
              : path
                  .split("/")
                  [path.split("/").length - 1].split("-")
                  .join(" ")}
          </Link>
          <span className="text-shade">
            {index < breads.length - 1 ? "" : ">"}
          </span>
        </div>
      ))}
      <span className="capitalize text-sm max-sm:text-[10px] font-medium text-primary-500  cursor-pointer">
        {currentPathName ||
          decodeURIComponent(
            breads[breads.length - 1]
              .split("/")
              [breads[breads.length - 1].split("/").length - 1].split("-")
              .join(" ")
          )}
      </span>
    </div>
  );
}
