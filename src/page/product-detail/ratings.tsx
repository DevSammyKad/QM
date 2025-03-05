'use client';
import ImgTab from '@/src/components/imgTab/img-tab';
import CrossSvg from '@/src/icons/crossSvg';
import StarSvg from '@/src/icons/starSvg';
import { ProductRatingType } from '@/src/types/productTypes';
import DialogWrapper from '@/src/ui/dialog-wrapper.tsx/dialog-wrapper';
import { Input, Textarea } from '@nextui-org/input';
import { Progress } from '@nextui-org/progress';
import { Button } from '@nextui-org/react';
import { useState } from 'react';

type Props = {
  ratings: ProductRatingType;
  totalReviews: number;
};

export default function Ratings({ ratings, totalReviews }: Props) {
  const [star, setStar] = useState(0);
  const [showRating, setShowRating] = useState(false);

  const showRatingModal = () => setShowRating(true);
  const closeRatingModal = () => setShowRating(false);

  // Ensure ratings object is properly initialized to prevent errors
  const totalRatings = ratings?.total_ratings ?? 0;
  const totalRecommended = ratings?.total_recommended ?? 0;
  const avgRating = ratings?.avg_rating ?? 0;
  const rates = ratings?.rates ?? {}; // Ensure rates exist
  const percentRecommend =
    totalRatings > 0 ? (totalRecommended / totalRatings) * 100 : 0;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-2xl">Ratings & Reviews ({totalReviews})</p>
      <div className="grid grid-cols-[1fr_max-content] gap-5">
        <div className="flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((label) => (
            <CustomProgress
              key={label}
              label={label}
              singleRating={rates[label] ?? 0} // Ensure no undefined value
              totalRating={totalRatings}
            />
          ))}
        </div>
        <RatingDetails
          avgRating={avgRating}
          recommendPercentage={Math.round(percentRecommend)}
          totalReviews={totalReviews}
        />
      </div>
      <Button onClick={showRatingModal} color="primary" variant="bordered">
        Write a review
      </Button>
      <DialogWrapper
        open={showRating}
        onClose={closeRatingModal}
        title="Rating & reviews"
        closeBtnIcon={<CrossSvg />}
        className="w-3/4 h-3/4 max-sm:w-[90%] flex flex-col bg-white rounded-md px-5 pt-3 pb-5"
      >
        <div className="w-full h-full flex max-sm:border-none border-8 border-shade border-opacity-25 rounded-md">
          <div className="w-1/3 max-lg:hidden flex flex-col border-r-8 border-shade border-opacity-25 h-full gap-7 max-xl:gap-1 p-4">
            <p className="text-xl max-xl:text-lg font-medium">
              What makes a good review
            </p>
            <ReviewTip
              title="Have you used this product?"
              text="Your review should be about your experience with the product."
            />
            <ReviewTip
              title="Why review a product?"
              text="Your valuable feedback will help fellow shoppers decide!"
            />
            <ReviewTip
              title="How to review a product?"
              text={
                <>
                  Your review should include facts. An honest opinion is always
                  appreciated. If you have an issue with product or service
                  please contact us from the{' '}
                  <a href="/" className="text-secondary-500">
                    help center
                  </a>
                  .
                </>
              }
            />
          </div>
          <div className="w-2/3 max-lg:w-full p-4 max-sm:p-0">
            <ReviewForm star={star} setStar={setStar} />
          </div>
        </div>
      </DialogWrapper>
    </div>
  );
}

// Helper component for review tips
const ReviewTip = ({
  title,
  text,
}: {
  title: string;
  text: React.ReactNode;
}) => (
  <div>
    <p className="text-xl max-xl:text-lg font-light">{title}</p>
    <p className="text-sm font-light">{text}</p>
  </div>
);

// Progress Bar Component
const CustomProgress = ({
  totalRating,
  singleRating,
  label,
}: {
  totalRating: number;
  singleRating: number;
  label: number;
}) => {
  const value = totalRating > 0 ? (singleRating / totalRating) * 100 : 0;
  return (
    <div className="grid grid-cols-[15px_1fr] items-center gap-1">
      <p className="text-shade text-center">{label}</p>
      <Progress
        value={value}
        className="w-full"
        color="primary"
        classNames={{
          indicator: 'rounded-none',
          track: 'rounded-none',
        }}
        size="md"
      />
    </div>
  );
};

// Rating Details Component
const RatingDetails = ({
  avgRating,
  recommendPercentage,
  totalReviews,
}: {
  avgRating: number;
  totalReviews: number;
  recommendPercentage: number;
}) => (
  <div className="flex flex-col gap-2 justify-between py-2 text-shade">
    <div>
      <p className="text-2xl max-sm:text-xl flex items-center gap-2">
        {avgRating.toFixed(2)} <StarSvg filled />
      </p>
      <p className="max-sm:text-sm">{totalReviews} Reviews</p>
    </div>
    <div>
      <p className="text-2xl max-sm:text-xl">{recommendPercentage}%</p>
      <p className="max-sm:text-sm">Recommended</p>
    </div>
  </div>
);

// Review Form Component
const ReviewForm = ({
  star,
  setStar,
}: {
  star: number;
  setStar: (star: number) => void;
}) => {
  const [openReviewSuccessPopUp, setOpenReviewSuccessPopUp] =
    useState<boolean>(false);
  const openReviewSuccessPopUpHandler = () => {
    setOpenReviewSuccessPopUp(true);
  };
  const closeReviewSuccessPopUpHandler = () => {
    setOpenReviewSuccessPopUp(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <p>Rate this product</p>
      <div className="flex items-center gap-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => setStar(index + 1)}
          >
            {index + 1 <= star ? (
              <StarSvg filled width={20} height={20} />
            ) : (
              <StarSvg width={20} height={20} />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 pt-3">
        <p>Review this product</p>
        <Input
          variant="bordered"
          color="primary"
          classNames={{
            input: 'placeholder:text-shade text-base',
            inputWrapper: 'rounded-xl',
          }}
          placeholder="Title"
        />
        <Textarea
          variant="bordered"
          rows={4}
          color="primary"
          classNames={{
            input: 'placeholder:text-shade text-base',
            inputWrapper: 'rounded-xl',
          }}
          placeholder="Review"
        />
        <Input
          variant="bordered"
          color="primary"
          classNames={{
            input: 'placeholder:text-shade text-base',
            inputWrapper: 'rounded-xl',
          }}
          placeholder="User name"
        />
        <Input
          variant="bordered"
          color="primary"
          classNames={{
            input: 'placeholder:text-shade text-base',
            inputWrapper: 'rounded-xl',
          }}
          placeholder="Email"
        />
        <div className="flex justify-end">
          <Button
            onClick={openReviewSuccessPopUpHandler}
            color="primary"
            variant="solid"
            className="mt-2 w-1/2"
          >
            Submit
          </Button>
        </div>
      </div>

      <DialogWrapper
        open={openReviewSuccessPopUp}
        onClose={closeReviewSuccessPopUpHandler}
        closeBtnIcon={<CrossSvg />}
        className="md:w-[45%] px-6 py-4 text-center rounded-xl"
        backgroundScroll="hidden"
      >
        <div className=" flex justify-center items-center">
          <img src="/RatingReview.png" alt="Rating Review" />
        </div>
      </DialogWrapper>
    </div>
  );
};
