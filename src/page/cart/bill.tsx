import { Divider } from '@nextui-org/divider';

export default function Bill() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[22px] font-semibold">Bill summary</p>
      <div className="text-shade flex flex-col gap-2">
        <p className="flex items-center justify-between gap-3">
          <span className="">Cart MRP</span>
          <span className="">₹4398</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">Other services</span>
          <span className="">₹19</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">Total discount</span>
          <span className="">-₹2201</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className=""> Delivery Charges </span>
          <span className="">₹2201</span>
        </p>

        <p className="flex items-center justify-between gap-3">
          <span className="">Packaging charge</span>
          <span className="">₹0</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">Handling charge</span>
          <span className="">₹0</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">Extra weight charges</span>
          <span className="">₹0</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">COD</span>
          <span className="">₹0</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">Fast Services</span>
          <span className="">₹0</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">emergency delivery Surcharge</span>
          <span className="">₹0</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">Delivery Partner Fee</span>
          <span className="">₹0</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">Long Distance Fee</span>
          <span className="">₹0</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">Convenience Changes</span>
          <span className="">₹0</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">E-Consultation Fee</span>
          <span className="">₹0</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="">Other charges</span>
          <span className="">₹0</span>
        </p>
        <Divider />
        <p className="flex text-black font-semibold text-xl items-center justify-between gap-3">
          <span className=" ">To be paid</span>
          <span className="">₹2216</span>
        </p>
      </div>
    </div>
  );
}
