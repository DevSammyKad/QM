import StarSvg from "@/src/icons/starSvg";
import TickSvg from "@/src/icons/tick-svg";
import { ReviewType } from "@/src/types/productTypes";

type Props = {
  reviewsData: ReviewType[];
};

export default function Reviews({ reviewsData }: Props) {
  return (
    <div className="w-full flex flex-col gap-5 ">
      <p className="text-2xl">Review this product</p>
      {reviewsData.map((reviewData, index) => (
        <ReviewCard reviewData={reviewData} key={index} />
      ))}
    </div>
  );
}

export const ReviewCard = ({ reviewData }: { reviewData: ReviewType }) => {
  return (
    <div className="w-full grid grid-cols-[1fr_max-content]">
      <div className="">
        <p className="text-lg   ">{reviewData.user}</p>
        <p className="text-shade font-medium">{reviewData.title}</p>
        <p className="text-shade ">{reviewData.comment}</p>
        {reviewData.is_recommended && (
          <p className="flex items-center gap-1 text-primary-500">
            <TickSvg />
            Recommended
          </p>
        )}{" "}
      </div>
      <div className="">
        <ReviewStarBox starCount={reviewData.rating} />
      </div>
    </div>
  );
};

export const ReviewStarBox = ({ starCount }: { starCount: number }) => {
  const fillArr = new Array(starCount).fill(null).map((_, index) => (
    <div key={index}>
      <StarSvg filled />
    </div>
  ));
  const emptyArr = new Array(5 - starCount).fill(null).map((_, index) => (
    <div key={index}>
      <StarSvg />
    </div>
  ));
  return (
    <div className="flex items-center gap-1">
      {fillArr}
      {emptyArr}
    </div>
  );
};
