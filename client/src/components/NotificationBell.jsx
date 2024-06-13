import { useState, useEffect } from "react";
import { TbBell } from "react-icons/tb";

const NotificationBell = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/notifications/getnotifications/"+localStorage.getItem("id"),
        );
        const data = await response.json();
        setNotifications(data.reverse());
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const markAsRead = (id) => {
    console.log("clicked");
    setNotifications(
      notifications.map((notification) =>
        notification.notification_id === id
          ? { ...notification, NotificationRead: true }
          : notification
      )
    );
    fetch("http://localhost:3000/api/notifications/readnotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationId: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="relative">
      <button
        className="border-2 p-2 rounded-full text-white shadow-lg"
        onClick={toggleDropdown}
      >
        <TbBell />
      </button>
      {showDropdown && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg overflow-auto"
          style={{ maxHeight: "400px" }}
        >
          <ul className="divide-y divide-gray-200">
            {notifications.map(
              ({
                NotificationDate,
                Message,
                NotificationRead,
                notification_id,
              }) => {
                const date = new Date(NotificationDate);
                const formattedDate = `${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear() % 100}`;
                return (
                  <li
                    key={notification_id}
                    className={`p-2 hover:bg-gray-100 cursor-pointer ${
                      NotificationRead ? "text-gray-500" : "text-gray-900"
                    }`}
                    onClick={() => markAsRead(notification_id)}
                  >
                    <p className="text-sm">{formattedDate}</p>
                    <p className="font-semibold">{Message}</p>
                    {!NotificationRead && (
                      <span className="text-xs text-blue-500">Read</span>
                    )}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
