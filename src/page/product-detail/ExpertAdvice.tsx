import React from 'react';

type Props = {};

const ExpertAdvice = ({}: Props) => {
  return (
    <div className="my-2">
      <h1 className="my-5 text-shade">Expert Advice</h1>

      <div className="flex space-x-3 my-2">
        <div className="flex items-center justify-center">
          <img
            src="/expert-advice.png"
            alt="Expert Advice"
            className="object-cover object-top w-[100px] h-[100px] rounded-lg "
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-primary-500">Dr Russ Mehta CHibber</h1>
          <p>BDS</p>
        </div>
      </div>
      <p>
        Fast&Up Charge is a completely natural Vitamin C supplement that
        delivers immunity-boosting ingredients like 1000mg Natural Amla extract
        and 10mg Zinc to help boost immune activity, support a robust immune
        response, and increase resistance to immune challenges. It is a
        well-known fact that Vitamin C is vital to maintain daily immunity.
      </p>
    </div>
  );
};

export default ExpertAdvice;
