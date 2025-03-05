import GlobalSearchBox from "@/src/ui/searchbox/global-search-box";
import dynamic from "next/dynamic";

const MyHeader = dynamic(() => import("@/src/components/my-health/MyHeader"), {
  loading: () => <p>Loading...</p>,
});
export default function page() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-medium">Search your lab tests</p>
        <GlobalSearchBox placeholder="Search" />
      </div>
      <div className="flex flex-col gap-2 py-5">
        <MyHeader />
      </div>
    </div>
  );
}
