import ImgTab from "@/src/components/imgTab/img-tab";
import React, { useState, useEffect } from "react";
import { header } from "@/src/page/utils/Api";

const EmptyNotification = () => {
  return (
    <div className="grid grid-cols-1 text-shade w-full justify-items-center items-center gap-2 p-5">
      <ImgTab
        src="/emptynotificatoin.png"
        alt="notification"
        className="w-[200px] h-full"
      />
      <p className="text-center text-xl">You’re all caught up</p>
      <p className="text-center">
        Come back later for Reminders, health tip, moments and weight
        notifications
      </p>
    </div>
  );
};

const NotificationList = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        limit: "100", // Fetch all notifications, change the limit if needed
        type: "user", // Replace with dynamic type if necessary
        rid: "51", // Replace with dynamic rid if necessary
      });

      const response = await fetch(
        `https://quickmeds.sndktech.online/notification-new.getAll?${params.toString()}`,
        {
          method: "GET",
          headers: header,
        }
      );

      const data = await response.json();

      if (data.status) {
        console.log("Notifications:", data.notifications);
        setNotifications(data.notifications);
      } else {
        console.log("No notifications found.");
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Error fetching notifications");
    } finally {
      setLoading(false); // Ensure that loading is set to false once fetch is complete
    }
  };

  useEffect(() => {
    fetchNotifications(); // Fetch all notifications
  }, []); // Fetch data on component mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col">
      {notifications.length === 0 ? (
        <EmptyNotification /> // Render the EmptyNotification component if no notifications
      ) : (
        <div className="flex flex-col flex-grow">
          <h2 className="text-center text-xl mb-4">Notifications</h2>
          {/* Scrollable container for notifications */}
          <div className="overflow-y-auto max-h-[400px] mb-4">
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="mb-4 p-4 border-b">
                  <p>{notification.content}</p>{" "}
                  {/* Display notification content */}
                  <p className="text-sm text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}{" "}
                    {/* Format the date */}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
