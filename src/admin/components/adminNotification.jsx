import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import useFetch from "../../common/useFetch"; // Import useFetch hook
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const AdminNotification = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const isAdminUser = isAdmin();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useFetch hook to fetch notifications
  const {
    data: adminNotificationsData,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch(`http://127.0.0.1:8000/api/authentication/notification-admin/`);

  useEffect(() => {
    if (adminNotificationsData) {
      setAdminNotifications(adminNotificationsData);
      setLoading(false);
    }
    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
    }
  }, [adminNotificationsData, fetchError]);

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/authentication/notification-inbox/${id}/`,
        { is_read: true }
      );
      // Update the notification locally
      setAdminNotifications((prevNotifications) =>
        prevNotifications.map((notification) => {
          if (notification.id === id) {
            return { ...notification, is_read: true };
          }
          return notification;
        })
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="bg-white sm:ml-64">
        <section className="bg-white min-h-screen py-12 lg:mx-[10px]">
          <div className="relative overflow-x-auto container">
            <div className="flex flex-col items-center mx-44 py-5">
              <div>
                <span className="text-red-700 text-4xl font-bold block mb-4">
                  Notifications
                </span>
              </div>
              <div className="mt-3 md:mt-0">
              <a
                  href="/create-notification"
                  className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                >
                  <button
                    id="dropdownRadioButton"
                    data-dropdown-toggle="dropdownRadio"
                    className=""
                    type="button"
                  >
                    + Add
                  </button>
                </a>
              </div>
            </div>
            <div className="flex justify-center mb-4 mx-10"></div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              adminNotifications.map((adminnotification) => (
                <div
                  key={adminnotification.id}
                  className={` flex justify-between bg-gray-100 p-4 rounded-lg mb-4 ${
                    adminnotification.is_read
                      ? "border border-blue-500"
                      : "border border-green-500"
                  }`}
                >
                  <div>
                    <p className="text-gray-800">{adminnotification.message}</p>
                  </div>
                  <div>
                    <span
                      className="cursor-pointer"
                      onClick={() => markAsRead(adminnotification.id)}
                    >
                      Mark As Read
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminNotification;
