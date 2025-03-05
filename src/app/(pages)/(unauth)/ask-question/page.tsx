import ArrowIcon from "@/src/icons/arrowIcon";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import { FormTextarea } from "@/src/ui/form/form-input";

export default function page() {
  return (
    <div>
      <div className="w-1/3 max-xl:w-2/5 max-md:h-3/5 max-sm:w-[80%] max-[400px]:w-full  mx-auto bg-white rounded-xl flex flex-col gap-2 shadow-product-card p-3">
        <div className="flex items-center text-xl font-medium gap-4">
          <ArrowIcon
            className="rotate-90 w-4 h-4 cursor-pointer"
            arrowFillColor="#F26522"
          />
          Ask question
        </div>
        <p className="text-shade">
          Please write your question in the given box and send it to us, our
          team will answer you as soon as possible.
        </p>
        <form className="flex flex-col gap-3 ">
          <FormTextarea
            rows={4}
            className="bg-white shadow-product-card py-2 border border-solid border-border-shade"
            placeholder="Write your question here"
          />
          <PrimaryButton>Submit</PrimaryButton>
        </form>
      </div>
    </div>
  );
}
