"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://quickmeds.sndktech.online/orders.By.userId/3",
          {
            headers: {
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE3NDE2ODgwMDQsImV4cCI6MTc0MjI5MjgwNH0.o6qDdVMIZ41ohYnDah_8XAdUxbwgiwj2zIxTjupoo5Y",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status && response.data.orders) {
          const formattedOrders = response.data.orders.map((order) => {
            const firstProduct = order.products?.[0]?.product || {};
            return {
              id: order.id,
              orderId: order.orderId,
              status: order.finalOrderStatus?.toLowerCase() || "unknown",
              orderDate: order.orderDate
                ? new Date(order.orderDate).toLocaleDateString()
                : "N/A",
              image: firstProduct.images?.[0] || "/placeholder.png", // Fixed undefined image issue
              title: firstProduct.productName || "No Product",
              price: order.amount,
              originalPrice: firstProduct.mrp || order.amount,
              showTrackButton:
                order.finalOrderStatus?.toLowerCase() !== "cancelled",
            };
          });

          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">Loading orders...</div>
    );
  }

  return (
    <div className="bg-gray-100 p-4">
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found</div>
      ) : (
        orders.map((order) => (
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
                  Order Date: <span>{order.orderDate}</span>
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
                  src={order.image} // ✅ Corrected image reference
                  alt="Order Image"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg text-gray-600 font-medium">
                  {order.title}
                </h3>
                <div className="flex items-center">
                  <span className="font-bold text-gray-800 mr-2">
                    ₹{order.price}
                  </span>
                  {order.originalPrice !== order.price && (
                    <span className="text-gray-400 line-through text-sm">
                      ₹{order.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                {order.status === "cancelled" ? (
                  <button className="px-6 py-2 border border-orange-400 text-orange-500 rounded-md hover:bg-orange-50 transition-colors">
                    Reorder
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
        ))
      )}
    </div>
  );
};

export default OrdersList;
