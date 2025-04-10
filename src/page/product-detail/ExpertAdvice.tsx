import React from "react";

type ExpertAdviceProps = {
  expertAdvice: {
    avatar: string;
    doctorName: string;
    designation: string;
    advice: string;
  } | null;
};

const ExpertAdvice = ({ expertAdvice }: ExpertAdviceProps) => {
  if (!expertAdvice) {
    return <p className="text-gray-500">Expert advice not available</p>;
  }

  return (
    <div className="my-2">
      <h2 className="my-5 text-xl font-semibold text-shade">Expert Advice</h2>

      <div className="flex space-x-3 my-2">
        <div className="flex items-center justify-center">
          <img
            src={expertAdvice.avatar || "/expert-advice.png"}
            alt="Expert Advice"
            className="object-cover object-top w-[100px] h-[100px] rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-primary-500 font-semibold">
            {expertAdvice.doctorName}
          </h3>
          <p className="text-gray-700">{expertAdvice.designation}</p>
        </div>
      </div>

      <p className="text-gray-800">{expertAdvice.advice}</p>
    </div>
  );
};

export default ExpertAdvice;
