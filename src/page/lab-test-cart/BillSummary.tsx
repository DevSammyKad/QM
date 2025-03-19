import { Divider } from '@nextui-org/react';

interface BillSummaryProps {
  cartData: any[]; // Accepts cart data as a prop
}

const BillSummary = ({ cartData }: BillSummaryProps) => {
  // Calculate total MRP, discount, and final price
  const totalMRP = cartData.reduce((sum, item) => sum + item.mrp, 0);
  const totalDiscount = cartData.reduce(
    (sum, item) => sum + (item.mrp - item.sellingPrice),
    0
  );
  const gstRate = 0.12; // 12% GST
  const otherServices = totalMRP * gstRate; // GST applied on MRP
  const totalPayable = totalMRP - totalDiscount + otherServices;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[22px] font-semibold">Bill Summary</p>
      <div className="text-shade flex flex-col gap-2">
        <p className="flex items-center justify-between gap-3">
          <span>Cart MRP</span>
          <span>₹{totalMRP.toFixed(2)}</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span>Other services</span>
          <span>₹{otherServices.toFixed(2)}</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span>Total discount</span>
          <span className="text-red-500">-₹{totalDiscount.toFixed(2)}</span>
        </p>
        <Divider />
        <p className="flex text-black font-semibold text-xl items-center justify-between gap-3">
          <span>To be paid</span>
          <span>₹{totalPayable.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default BillSummary;
