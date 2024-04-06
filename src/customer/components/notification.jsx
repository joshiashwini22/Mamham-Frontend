import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserIdFromStorage } from "../../utils/utils";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchNotifications = async () => {
    try {
      const customerId = getUserIdFromStorage();
      const response = await axios.get(
        `http://127.0.0.1:8000/api/authentication/notification-user/${customerId}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative inline-block text-left z-10"> {/* Ensure the dropdown appears on top */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-800 focus:outline-none"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
          <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs text-white bg-red-500 rounded-full">
            {notifications.length}
          </span>
      </button>

      {showDropdown && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <h3 className="text-xl px-4 py-2">Notifications</h3>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  {notification.message}
                </div>
              ))
            ) : (
              <div className="block px-4 py-2 text-sm text-gray-700">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
