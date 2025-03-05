import ImgTab from '@/src/components/imgTab/img-tab';
import { PackageCardType } from '@/src/types';
const defaultImageUrl = 'placeholder.png';

type CardType = {
  forCarousel?: boolean;
  data: PackageCardType;
};
export default function PackageCard({ data, forCarousel }: CardType) {
  return (
    <div
      className={`${
        forCarousel ? 'min-w-[300px]' : 'w-full'
      }  rounded-lg overflow-hidden shadow-product-card`}
    >
      <ImgTab
        src={data.imgUrl || defaultImageUrl}
        alt="package"
        className=" w-full  aspect-[3/2] "
      />
      <p className="text-lg bg-white text-center py-2 font-medium">
        {data.name}
        {data.title}
      </p>
    </div>
  );
}
