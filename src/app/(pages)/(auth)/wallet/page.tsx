import { Button } from "@nextui-org/react";
import { User } from "@nextui-org/user";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="w-full ">
      <p className="text-4xl font-semibold">Wallet</p>
      <div className="flex items-start max-lg:flex-col max-lg:items-center max-lg:gap-5 py-7 gap-20">
        <div className="w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-2/3 max-sm:w-[90%] flex flex-col gap-5 items-center">
          <div className="bg-primary-500  w-full aspect-square relative p-10 flex items-center justify-center rounded-full">
            <div className=" text-shade bg-white flex justify-center items-center flex-col  aspect-square w-full rounded-full">
              <p className="text-[28px] font-semibold">₹5,643.50</p>
              <p>Available Balance</p>
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <Button className="" color="primary" variant="bordered">
              + Add money
            </Button>
          </div>
        </div>
        <div className="w-3/4 max-xl:w-2/3 max-lg:w-full">
          <p className="text-primary-500 font-semibold">Recent transaction</p>

          <div className="flex pt-5 flex-col gap-5 ">
            <div className="flex bg-white rounded-3xl px-5 py-2 justify-between items-center">
              <User
                name="Digi lab"
                description="Jan 8 , 2024"
                avatarProps={{
                  src: "",
                }}
              />
              <p className="border border-border-shade text-shade px-3 py-1 rounded-xl">
                - ₹1,000
              </p>
            </div>
            <div className="flex bg-white rounded-3xl px-5 py-2 justify-between items-center">
              <User
                name="Digi lab"
                description="Jan 8 , 2024"
                avatarProps={{
                  src: "",
                }}
              />
              <p className="border border-border-shade text-shade px-3 py-1 rounded-xl">
                - ₹1,000
              </p>
            </div>
            <div className="flex bg-white rounded-3xl px-5 py-2 justify-between items-center">
              <User
                name="Digi lab"
                description="Jan 8 , 2024"
                avatarProps={{
                  src: "",
                }}
              />
              <p className="border border-border-shade text-shade px-3 py-1 rounded-xl">
                - ₹1,000
              </p>
            </div>
            <div className="flex bg-white rounded-3xl px-5 py-2 justify-between items-center">
              <User
                name="Digi lab"
                description="Jan 8 , 2024"
                avatarProps={{
                  src: "",
                }}
              />
              <p className="border border-border-shade text-shade px-3 py-1 rounded-xl">
                - ₹1,000
              </p>
            </div>
            <div className="flex bg-white rounded-3xl px-5 py-2 justify-between items-center">
              <User
                name="Digi lab"
                description="Jan 8 , 2024"
                avatarProps={{
                  src: "",
                }}
              />
              <p className="border border-border-shade text-shade px-3 py-1 rounded-xl">
                - ₹1,000
              </p>
            </div>
            <div className="flex bg-white rounded-3xl px-5 py-2 justify-between items-center">
              <User
                name="Digi lab"
                description="Jan 8 , 2024"
                avatarProps={{
                  src: "",
                }}
              />
              <p className="border border-border-shade text-shade px-3 py-1 rounded-xl">
                - ₹1,000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
