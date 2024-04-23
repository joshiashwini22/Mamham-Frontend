import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]); // Proper initialization
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility toggle

  const fetchNotifications = async () => {
    try {
      const accessToken = localStorage.getItem('access_token'); // Get the token
      const response = await axios.get(
        'http://127.0.0.1:8000/api/authentication/notification-user/',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotifications(response.data); // Update state with fetched notifications
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  
  useEffect(() => {
    setInterval(() => {
  console.log("here");
  fetchNotifications();
}, 2000);
}, [])


  useEffect(() => {
    fetchNotifications(); // Fetch notifications on component mount
  }, []); // Empty dependency array to ensure it runs once on mount

  const handleNotificationClick = async (id) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/authentication/notification-inbox/${id}/`,
        { is_read: true } // Mark as read
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => {
          if (notification.id === id) {
            return { ...notification, is_read: true }; // Mark as read in state
          }
          return notification;
        })
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification.is_read
  );

  return (
    <div className="relative inline-block text-left z-10"> 
      <button
        onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
        className="relative inline-flex items-center justify-center w-8 h-8 focus:outline-none"
      >
        <svg
          className="w-5 h-5" // Reduced icon size to balance the badge
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path
            d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807C0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"
          />
        </svg>

        {/* Smaller badge */}
        {unreadNotifications.length > 0 && (
          <span
            className="absolute top-0 right-0 inline-block w-5 h-5 text-xs text-white bg-red-500 rounded-full text-center flex items-center justify-center"
          >
            {unreadNotifications.length} {/* Display number of unread notifications */}
          </span>
        )}
      </button>

      {showDropdown && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            <h3 className="text-xl px-4 py-2">Notifications</h3>
            <div className="overflow-y-auto max-h-60">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`block px-4 py-2 text-sm cursor-pointer ${
                      notification.is_read
                        ? 'text-gray-700'
                        : 'text-gray-700 font-bold bg-gray-200' // Styling for unread notifications
                    }`}
                    onClick={() => handleNotificationClick(notification.id)} // Mark as read on click
                  >
                    {notification.message}
                    {!notification.is_read && (
                      <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-blue-500 rounded-full"></span> // Indicator for unread
                    )}
                  </div>
                ))
              ) : (
                <div class="block px-4 py-2 text-sm text-gray-700">No notifications</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
