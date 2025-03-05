import ImgTab from "../imgTab/img-tab";

export default function BannerCard({
  data,
  forCarousel,
}: {
  data: string;
  forCarousel?: boolean;
}) {
  return (
    <ImgTab
      src={data}
      alt="banner"
      className={`min-w-[500px] max-xl:min-w-[400px] max-md:min-w-[350px] aspect-video`}
    />
  );
}
