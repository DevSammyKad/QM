"use client";
import CrossSvg from "@/src/icons/crossSvg";
import StarSvg from "@/src/icons/starSvg";
import { ProductRatingType } from "@/src/types/productTypes";
import DialogWrapper from "@/src/ui/dialog-wrapper.tsx/dialog-wrapper";
import { Input, Textarea } from "@nextui-org/input";
import { Progress } from "@nextui-org/progress";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify"; // Toast notification for success/error messages

type Props = {
  ratings: ProductRatingType;
  totalReviews: number;
};

export default function Ratings({ ratings, totalReviews }: Props) {
  const [star, setStar] = useState<number>(0);
  const [showRating, setShowRating] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Success popup state


  const showRatingModal = () => setShowRating(true);
  const closeRatingModal = () => setShowRating(false);

  const totalRatings = ratings?.total_ratings ?? 0;
  const totalRecommended = ratings?.total_recommended ?? 0;
  const avgRating = ratings?.avg_rating ?? 0;
  const rates = ratings?.rates ?? {}; // Avoid undefined errors
  const percentRecommend =
    totalRatings > 0 ? (totalRecommended / totalRatings) * 100 : 0;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-2xl font-semibold">
        Ratings & Reviews ({totalReviews})
      </p>
      <div className="grid grid-cols-[1fr_max-content] gap-5">
        <div className="flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((label) => (
            <CustomProgress
              key={label}
              label={label}
              singleRating={rates[label] ?? 0}
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
        title="Rating & Reviews"
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
                  appreciated. If you have an issue with the product or service,
                  please contact us from the{" "}
                  <a href="/" className="text-secondary-500">
                    help center
                  </a>
                  .
                </>
              }
            />
          </div>
          <div className="w-2/3 max-lg:w-full p-4 max-sm:p-0">
            <ReviewForm
              star={star}
              setStar={setStar}
              closeRatingModal={closeRatingModal}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </DialogWrapper>
       {/* Success Popup Modal */}
       {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
            <img src="/RatingReview.png" alt="Rating Review" className="mb-4 w-[150px] h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ Helper component for review tips
const ReviewTip = ({
  title,
  text,
}: {
  title: string;
  text: React.ReactNode;
}) => (
  <div>
    <p className="text-xl max-xl:text-lg font-medium">{title}</p>
    <p className="text-sm font-light">{text}</p>
  </div>
);

// ✅ Progress Bar Component
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
        classNames={{ indicator: "rounded-none", track: "rounded-none" }}
        size="md"
      />
    </div>
  );
};

// ✅ Rating Details Component
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
        {avgRating.toFixed(1)} <StarSvg filled />
      </p>
      <p className="max-sm:text-sm">{totalReviews} Reviews</p>
    </div>
    <div>
      <p className="text-2xl max-sm:text-xl">{recommendPercentage}%</p>
      <p className="max-sm:text-sm">Recommended</p>
    </div>
  </div>
);

// ✅ Review Form Component
const ReviewForm = ({
  star,
  setStar,
  closeRatingModal, // Added closeRatingModal as prop
  setIsOpen
}: {
  star: number;
  setStar: (star: number) => void;
  closeRatingModal: () => void; // Ensure this is passed down from the parent
}) => {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    const selectedProductId = localStorage.getItem("selectedProductId");


    const reviewData = {
      productId: selectedProductId, // Change this with the actual product ID
      ipAddress: "192.168.1.1", // Optionally, set a dynamic IP address.
      rating: star,
      title: title,
      review: review,
      userName: userName,
      email: email,
      recommendOthers: true, // Adjust as needed based on user input
    };

    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "https://quickmeds.sndktech.online/review.add",
        {
          method: "POST",
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Ensure you have the correct API token
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      const data = await response.json();

      if (data.status) {
        // toast.success("Your rating and review have been uploaded!"); // Use a toast library like react-toastify for success feedback
        // Reset form fields after successful submission
        setTitle("");
        setReview("");
        setUserName("");
        setEmail("");
        setStar(0); // Reset star rating
        closeRatingModal(); // Close the modal after successful review submission
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 2000); 
      } else {
        // toast.error(data.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      // toast.error("Something went wrong, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">Rate this product</p>
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
        <p className="font-semibold">Review this product</p>
        <Input
          variant="bordered"
          color="primary"
          placeholder="Title"
          className="rounded-xl"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          variant="bordered"
          rows={4}
          color="primary"
          placeholder="Review"
          className="rounded-xl"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <Input
          variant="bordered"
          color="primary"
          placeholder="User name"
          className="rounded-xl"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          variant="bordered"
          color="primary"
          placeholder="Email"
          className="rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            color="primary"
            variant="solid"
            className="mt-2 w-1/2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};
