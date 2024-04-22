import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../sidebar";
import axios from "axios";
import useFetch from "../../common/useFetch";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const NotificationCreate = ({ onNotificationCreated }) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const isAdminUser = isAdmin();

  useEffect(() => {
    if (!isAdminUser) {
      navigate("/login");
    }
  }, [isAdminUser, navigate]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useFetch("http://127.0.0.1:8000/api/authentication/user");

  const handleCreateNotification = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/authentication/notification-create/",
        {
          users: selectedUsers,
          message,
          title,
        }
      );
      toast.success("Notification sent successfully!");
      setSelectedUsers([]);
      setMessage("");
      setTitle("");
      if (onNotificationCreated) {
        onNotificationCreated(response.data);
      }
    } catch (error) {
      toast.error("Error creating notification. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUserSelectChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedUsers(selectedValues);
  };

  return (
    <>
      <Sidebar />
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-red-700">
            Create a New Notification
          </h2>
          <form>
            <div className="my-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email Title
              </h3>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5"
                rows="1"
                placeholder="Enter your email title here..."
              ></textarea>
            </div>
            <div className="my-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Message
              </h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5"
                rows="4"
                placeholder="Enter your message here..."
              ></textarea>
            </div>
            <div className="my-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select User
              </h3>
              {usersLoading ? (
                <p>Loading users...</p>
              ) : usersError ? (
                <p>Error fetching users. Please try again.</p>
              ) : (
                <select
                  multiple
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5"
                  onChange={handleUserSelectChange}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCreateNotification}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center border border-gray-300 text-blue bg-red-700 rounded-lg focus:ring-2 focus:ring-primary-600 hover:bg-primary-800 text-white"
              >
                Send Notification
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center border border-gray-300 text-blue bg-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default NotificationCreate;
