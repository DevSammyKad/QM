'use client';

interface BillSummaryProps {
  cartMrp: number;
  otherServices: number;
  totalDiscount: number;
  totalPayment: number;
}

const BillSummary = ({
  cartMrp,
  otherServices,
  totalDiscount,
  totalPayment,
}: BillSummaryProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl text-gray-500 mb-4">Bill summary</h2>

      <div className="flex justify-between mb-3">
        <p className="text-gray-500">Cart MRP</p>
        <p className="text-gray-600">₹{(Number(cartMrp) || 0).toFixed(2)}</p>
      </div>

      <div className="flex justify-between mb-3">
        <p className="text-gray-500">Other services</p>
        <p className="text-gray-600">
          ₹{(Number(otherServices) || 0).toFixed(2)}
        </p>
      </div>

      <div className="flex justify-between mb-3">
        <p className="text-gray-500">Total discount</p>
        <p className="text-green-600">
          -₹{(Number(totalDiscount) || 0).toFixed(2)}
        </p>
      </div>

      <div className="border-t pt-3 flex justify-between font-medium">
        <p className="text-gray-500">To be paid</p>
        <p className="text-gray-600">
          ₹{(Number(totalPayment) || 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default BillSummary;
