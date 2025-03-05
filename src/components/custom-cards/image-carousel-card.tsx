/* eslint-disable @next/next/no-img-element */
type Props = {
  data: {
    url: string;
    title: string;
    desc: string;
  };
};

export default function ImageCarouselCard({ data }: Props) {
  return (
    <div className="w-full flex-col flex items-center justify-center">
      <img
        src={data.url}
        alt="image-card"
        className="w-full max-w-[325px] object-cover object-center aspect-square"
      />
      <p className="text-center w-full font-semibold text-xl">{data.title}</p>
      <p className="text-center w-full text-shade ">{data.desc}</p>
    </div>
  );
}
