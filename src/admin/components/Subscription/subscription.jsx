import React, { useState, useEffect } from "react";
import useFetch from "../../../common/useFetch";
import Sidebar from "../../sidebar";
import axios from "axios";

const Subscription = () => {
  const [filters, setFilters] = useState({
    customer: "",
    deliveryDate: "",
    deliveryTime: "",
    status: "",
  });

  const [editedSubscription, setEditedSubscription] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const {
    data: subscriptions,
    loading: subscriptionsLoading,
    error: subscriptionsError,
  } = useFetch(
    `http://127.0.0.1:8000/api/subscription/get-subscription-order/?customer=${filters.customer}&start_date=${filters.deliveryDate}&delivery_time=${filters.deliveryTime}&status=${filters.status}`
  );

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

  const handleEditClick = (subscription) => {
    setEditedSubscription({ ...subscription });
    if (subscription.customer) {
      fetchAddressesForCustomer(subscription.customer.id);
    }
  };

  const handleInputChange = (e, field) => {
    let value;
    if (field === "delivery_address") {
      value = parseInt(e, 10);
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
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/subscriptions/${editedSubscription.id}/`,
        editedSubscription
      );
      const updatedSubscription = response.data;
      console.log("Subscription successfully updated:", updatedSubscription);
      setEditedSubscription(null);
    } catch (error) {
      console.error("Error saving subscription:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedSubscription(null);
  };

  return (
    <>
      <Sidebar />
      <div className="bg-white sm:ml-64">
        <section className="bg-white min-h-screen py-12 lg:mx-[10px]">
          <div className="relative overflow-x-auto container">
            <div className="flex flex-col items-center mx-44 py-5">
              <span className="text-red-700 text-4xl font-bold block mb-4">
                All Subscriptions
              </span>
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
            </div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Start Date</th>
                  <th className="px-4 py-2">End Date</th>
                  <th className="px-4 py-2">Delivery Time</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Delivery Address</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Plan</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Remarks</th>
                  <th className="px-4 py-2">Is Paid</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
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
                      <td className="border px-4 py-2">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          subscription.customer
                        ) : (
                          subscription.customer
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <input
                            type="date"
                            name="startDate"
                            value={editedSubscription.start_date}
                            onChange={(e) =>
                              handleInputChange(e, "start_date")
                            }
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          subscription.start_date
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <input
                            type="date"
                            name="endDate"
                            value={editedSubscription.end_date}
                            onChange={(e) =>
                              handleInputChange(e, "end_date")
                            }
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          subscription.end_date
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <input
                            type="time"
                            name="deliveryTime"
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
                      <td className="border px-4 py-2">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          subscription.duration
                        ) : (
                          subscription.duration
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <select
                            name="deliveryAddress"
                            value={editedSubscription.delivery_address}
                            onChange={(e) =>
                              handleInputChange(e.target.value, "delivery_address")
                            }
                            className="border rounded-md px-2 py-1 w-full"
                          >
                            <option value="">Select Address</option>
                            {addresses.map((address) => (
                              <option
                                key={address.id}
                                value={address.id}
                              >
                                {address.label}, {address.address_line1}, {address.city}
                              </option>
                            ))}
                          </select>
                        ) : (
                          subscription.delivery_address
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <select
                            name="status"
                            value={editedSubscription.status}
                            onChange={(e) =>
                              handleInputChange(e, "status")
                            }
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
                      <td className="border px-4 py-2">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <input
                            type="text"
                            name="plan"
                            value={editedSubscription.plan}
                            onChange={(e) => handleInputChange(e, "plan")}
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          subscription.plan
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editedSubscription &&
                        editedSubscription.id === subscription.id ? (
                          <input
                            type="number"
                            name="total"
                            value={editedSubscription.total}
                            onChange={(e) => handleInputChange(e, "total")}
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          subscription.total
                        )}
                      </td>
                      <td className="border px-4 py-2">
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
                      <td className="border px-4 py-2">
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
                      <td className="border px-4 py-2">
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
    </>
  );
};

export default Subscription;
