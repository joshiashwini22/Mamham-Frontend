import React, { useState, useEffect } from "react";
import useFetch from "../../../common/useFetch";
import Sidebar from "../../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Subscription = () => {

  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const isAdminUser = isAdmin();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  const [filters, setFilters] = useState({
    customer: "",
    deliveryDate: "",
    deliveryTime: "",
    status: "",
  });

  const [editedSubscription, setEditedSubscription] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const accessToken = localStorage.getItem("access_token");

  const {
    data: subscriptions,
    loading: subscriptionsLoading,
    error: subscriptionsError,
  } = useFetch(
    `http://127.0.0.1:8000/api/subscription/get-subscription-order/?customer=${filters.customer}&start_date=${filters.deliveryDate}&delivery_time=${filters.deliveryTime}&status=${filters.status}&page=${currentPage}&page_size=${itemsPerPage}`
  );
  console.log(subscriptions);

  const fetchAddressesForCustomer = async (customerId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/authentication/getaddressforcustomer/${customerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }
      const addressData = await response.json();
      setAddresses(addressData.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleResetFilters = () => {
    // Reset all filter values
    setFilters({
      customer: "",
    deliveryDate: "",
    deliveryTime: "",
    status: "",
    });
  };

  const handleEditClick = (subscription) => {
    setEditedSubscription({
      ...subscription,
      delivery_address: subscription.delivery_address.id,
    });

    if (subscription.customer) {
      fetchAddressesForCustomer(subscription.customer.id);
    }
  };

  const handleInputChange = (e, field) => {
    let value;
    if (field === "delivery_address") {
      value = parseInt(e, 10);
    } else if (field === "delivery_time") {
      value = e.target.value;
    } else {
      value = e.target ? e.target.value : e;
    }
    setEditedSubscription((prevSubscription) => ({
      ...prevSubscription,
      [field]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      if (editedSubscription.customer) {
        editedSubscription.customer = editedSubscription.customer.id;
      }
      if (editedSubscription.plan) {
        editedSubscription.plan = editedSubscription.plan.id;
      }
      if (!isTimeInRange(editedSubscription.delivery_time)) {
        // Handle out of range time selection
        toast.error("Please select a time between 10:00 AM and 8:00 PM.");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/subscription/subscription-order/${editedSubscription.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(editedSubscription),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update subscription");
      }

      const updatedSubscription = await response.json();

      console.log("Subscription successfully updated:", updatedSubscription);

      setEditedSubscription(null);
window.location.reload()

    } catch (error) {
      console.error("Error saving subscription:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedSubscription(null);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (subscriptions && subscriptions.count) {
      const totalPagesCount = Math.ceil(subscriptions.count / itemsPerPage);
      setTotalPages(totalPagesCount);
    }
  }, [subscriptions, itemsPerPage]);

  const isTimeInRange = (time) => {
    console.log(time);
    const selectedHour = parseInt(time.split(":")[0], 10);
    return selectedHour >= 10 && selectedHour <= 20;
  };

  return (
    <>
      <Sidebar />
      <div className="bg-white sm:ml-64">
        <section className="bg-white min-h-screen py-12 lg:mx-[10px]">
          <div className="relative overflow-x-auto container">
            <div className="flex flex-col items-center mx-44 py-5">
              <h3 className="text-red-800 text-xl font-bold sm:text-2xl">
                All Subscriptions
              </h3>
              <p className="text-gray-600 mt-2">
              Here are the order details of subscriptions.


              </p>
            </div>
            <div className="flex justify-end mb-4 mx-4 space-x-4">
              <input
                type="text"
                name="customer"
                placeholder="Search by Customer ID"
                value={filters.customer}
                onChange={handleFilterChange}
                className="border rounded-md px-2 py-1"
              />
              <input
                type="date"
                name="deliveryDate"
                value={filters.deliveryDate}
                onChange={handleFilterChange}
                className="border rounded-md px-2 py-1"
              />
              <input
                type="time"
                name="deliveryTime"
                value={filters.deliveryTime}
                onChange={handleFilterChange}
                className="border rounded-md px-2 py-1"
              />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="border rounded-md px-2 py-1"
              >
                <option value="">Select Status</option>
                <option value="ONGOING">OnGoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              {/* Reset Button */}
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={handleResetFilters}
                >
                Reset Filters
              </button>
            </div>
            {/* Pagination buttons */}
            <div className="flex justify-center my-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-4 py-2 rounded-md mr-2 ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => handlePageClick(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">ID</th>
                  <th className="py-3 px-6">Customer</th>
                  <th className="py-3 px-6">Start Date</th>
                  <th className="py-3 px-6">End Date</th>
                  <th className="py-3 px-6">Delivery Time</th>
                  <th className="py-3 px-6">Duration</th>
                  <th className="py-3 px-6">Delivery Address</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Plan</th>
                  <th className="py-3 px-6">Total</th>
                  <th className="py-3 px-6">Remarks</th>
                  <th className="py-3 px-6">Is Paid</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {subscriptionsLoading ? (
                  <tr>
                    <td colSpan="12">Loading...</td>
                  </tr>
                ) : subscriptionsError ? (
                  <tr>
                    <td colSpan="12">Error: {subscriptionsError.message}</td>
                  </tr>
                ) : subscriptions && subscriptions.results.length > 0 ? (
                  subscriptions.results.map((subscription) => (
                    <tr key={subscription.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id
                          ? subscription.id
                          : subscription.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id
                          ? subscription.customer
                            ? `${subscription.customer.first_name} ${subscription.customer.last_name}`
                            : "N/A"
                          : subscription.customer
                          ? `${subscription.customer.first_name} ${subscription.customer.last_name}`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id
                          ? subscription.start_date
                          : subscription.start_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id
                          ? subscription.end_date
                          : subscription.end_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <input
                            type="time"
                            name="delivery_time"
                            value={editedSubscription.delivery_time}
                            onChange={(e) =>
                              handleInputChange(e, "delivery_time")
                            }
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          subscription.delivery_time
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id
                          ? subscription.duration
                          : subscription.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <select
                            name="deliveryAddress"
                            value={editedSubscription.delivery_address}
                            onChange={(e) =>
                              handleInputChange(
                                e.target.value,
                                "delivery_address"
                              )
                            }
                            className="border rounded-md px-2 py-1 w-full"
                          >
                            <option value="">Select Address</option>
                            {addresses.map((address) => (
                              <option key={address.id} value={address.id}>
                                {address.label}, {address.address_line1}
                              </option>
                            ))}
                          </select>
                        ) : subscription.delivery_address ? (
                          `${subscription.delivery_address.address_line1}`
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <select
                            name="status"
                            value={editedSubscription.status}
                            onChange={(e) => handleInputChange(e, "status")}
                            className="border rounded-md px-2 py-1 w-full"
                          >
                            <option value="ONGOING">OnGoing</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        ) : (
                          subscription.status
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id
                          ? subscription.plan.name
                          : subscription.plan.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id
                          ? subscription.total
                          : subscription.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <input
                            type="text"
                            name="remarks"
                            value={editedSubscription.remarks}
                            onChange={(e) => handleInputChange(e, "remarks")}
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          subscription.remarks
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <input
                            type="checkbox"
                            name="isPaid"
                            checked={editedSubscription.isPaid}
                            onChange={(e) => handleInputChange(e, "isPaid")}
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : subscription.isPaid ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <>
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                              onClick={handleSaveClick}
                            >
                              Save
                            </button>
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded-md"
                              onClick={handleCancelClick}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                            onClick={() => handleEditClick(subscription)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12">No subscriptions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default Subscription;
