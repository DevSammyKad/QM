import StarSvg from "@/src/icons/starSvg";
import TickSvg from "@/src/icons/tick-svg";
import { ReviewType } from "@/src/types/productTypes";

type Props = {
  reviewsData: ReviewType[];
};

export default function Reviews({ reviewsData }: Props) {
  return (
    <div className="w-full flex flex-col gap-5">
      <p className="text-2xl font-semibold">Customer Reviews</p>

      {reviewsData.length > 0 ? (
        reviewsData.map((reviewData) => (
          <ReviewCard reviewData={reviewData} key={reviewData.id} />
        ))
      ) : (
        <p className="text-gray-500">No reviews available.</p>
      )}
    </div>
  );
}

export const ReviewCard = ({ reviewData }: { reviewData: ReviewType }) => {
  return (
    <div className="w-full grid grid-cols-[1fr_max-content] gap-4 p-4 border-b">
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{reviewData.userName}</p>
        <p className="text-gray-600">{reviewData.title}</p>
        <p className="text-gray-700">{reviewData.review}</p>

        {reviewData.is_recommended && (
          <p className="flex items-center gap-1 text-green-500">
            <TickSvg />
            Recommended
          </p>
        )}
      </div>

      <div className="flex items-center">
        <ReviewStarBox starCount={reviewData.rating} />
      </div>
    </div>
  );
};

export const ReviewStarBox = ({ starCount }: { starCount: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(starCount)].map((_, index) => (
        <StarSvg key={index} filled />
      ))}
      {[...Array(5 - starCount)].map((_, index) => (
        <StarSvg key={index} />
      ))}
    </div>
  );
};
