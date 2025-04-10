import Image from "next/image";
import Link from "next/link";
import React from "react";

const orders = [
  {
    id: "123456",
    status: "delivered",
    orderDate: "03-04-2024",
    image: "/vitamin-c.png",
    title: "Zinga vita Vitamin Amla Extract 1000mg Tablet",
    description:
      "FastRUp Charge is a completely natural Vitamin C supplement that delivers immunity-boosting...",
    price: 366,
    originalPrice: 999,
    showTrackButton: true, // Show Track button
  },
  {
    id: "789012",
    status: "delivered",
    orderDate: "02-15-2024",
    image: "/vitamin-c.png",
    title: "Zinga vita Vitamin Amla Extract 1000mg Tablet",
    description:
      "FastRUp Charge is a completely natural Vitamin C supplement that delivers immunity-boosting...",
    price: 366,
    originalPrice: 999,
    showTrackButton: false, // Hide Track button for this order
  },
  {
    id: "345678",
    status: "cancelled",
    orderDate: null,
    image: "/vitamin-c.png",
    title: "Zinga vita Vitamin Amla Extract 1000mg Tablet",
    description:
      "FastRUp Charge is a completely natural Vitamin C supplement that delivers immunity-boosting...",
    price: 366,
    originalPrice: 999,
  },
];

const OrdersList = () => {
  return (
    <div className="bg-gray-100 p-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-md shadow-sm p-4 mb-4 border border-gray-200"
        >
          <div
            className={`flex items-center justify-between p-3 rounded-t-md ${
              order.status === "cancelled"
                ? "bg-red-100 text-red-500"
                : "bg-sky-50 text-teal-500"
            }`}
          >
            {order.status === "cancelled" ? (
              <p className="font-medium">
                Order cancelled:{" "}
                <span className="text-gray-600">
                  If you’ve paid online, refund will be initiated shortly.
                </span>
              </p>
            ) : (
              <p className="font-medium">
                Order Date <span>{order.orderDate}</span>
              </p>
            )}
            {order.status !== "cancelled" && (
              <button className="flex items-center gap-1 text-orange-500 border border-orange-400 px-3 py-1 rounded-md hover:bg-orange-50 transition-colors">
                📞 Call delivery person
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-2 p-3">
            <div className="w-24 h-24 relative">
              <Image
                src={order.image}
                alt={order.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-lg text-gray-600 font-medium">
                {order.title}
              </h3>
              <p className="text-gray-400 text-sm mb-2">{order.description}</p>
              <div className="flex items-center">
                <span className="font-bold text-gray-800 mr-2">
                  ₹{order.price}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ₹{order.originalPrice}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              {order.status === "cancelled" ? (
                <button className="px-6 py-2 border border-orange-400 text-orange-500 rounded-md hover:bg-orange-50 transition-colors">
                  Re order
                </button>
              ) : (
                <>
                  {order.showTrackButton && (
                    <Link href={`/track-orders/${order.id}`}>
                      <button className="px-6 py-2 border border-orange-400 text-orange-500 rounded-md hover:bg-orange-50 transition-colors">
                        Track order
                      </button>
                    </Link>
                  )}
                  <Link href={`/my-orders/${order.id}`}>
                    <button className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">
                      See details
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
