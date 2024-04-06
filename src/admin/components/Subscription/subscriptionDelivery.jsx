import React, { useState } from "react";
import useFetch from "../../../common/useFetch";
import Sidebar from "../../sidebar";

const SubscriptionDelivery = () => {
  // Get today's date and format it as yyyy-mm-dd
//   const today = new Date().toISOString().split("T")[0];

  const [filters, setFilters] = useState({
    deliveryDate: "",
    deliveryTime: "",
    deliveryAddress: "",
    status: "",
    subscriptionId: "",
    customerId: "",
    deliveryId: "",
  });

  const [editedDelivery, setEditedDelivery] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const {
    data: deliverySubscription,
    loading: deliveryLoading,
    error: deliveryError,
  } = useFetch(
    `http://127.0.0.1:8000/api/subscription/subscription-deliveries/?delivery_date=${filters.deliveryDate}&status=${filters.status}&delivery_id=${filters.deliveryId}&subscription__customer__id=${filters.customerId}&subscription__plan__id=${filters.subscriptionId}`
  );
  console.log(deliverySubscription);

  const fetchAddressesForCustomer = async (customerId) => {
    try {
      if (!Response.ok) {
        throw new Error("Failed to fetch address");
      }
      const addressdata = await Response.json();
      setAddresses(addressdata.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleInputChange = (e, field) => {
    let value;
    if (field === "delivery_address" || field === "planId") {
      value = parseInt(e, 10); // Parse the value as an integer
    } else {
      value = e.target ? e.target.value : e; // Keep other fields as they are
    }
    setEditedDelivery((prevOrder) => ({
      ...prevOrder,
      [field]: value,
    }));
  };

  const handleEditClick = (delivery) => {
    setEditedDelivery({ ...delivery });
    if (delivery.subscription.customer) {
      fetchAddressesForCustomer(delivery.subscription.customer.id);
    }
  };
  const handleSaveClick = async () => {};
  const handleCancelClick = () => {
    // Reset editedOrder state to exit edit mode
    setEditedDelivery(null);
  };

  return (
    <>
      <Sidebar />
      <div className="bg-white sm:ml-64">
        <section className="bg-white min-h-screen py-12 lg:mx-[10px]">
          <div className="relative overflow-x-auto container">
            <div className="flex flex-col items-center mx-44 py-5">
              <span className="text-red-700 text-4xl font-bold block mb-4">
                Subscription Delivery
              </span>
            </div>
            <div className="flex justify-end mb-4 mx-4 space-x-4">
              <input
                type="date"
                name="deliveryDate"
                value={filters.deliveryDate}
                onChange={handleFilterChange}
                className="border rounded-md px-2 py-1"
              />
              <input
                type="text"
                name="deliveryId"
                placeholder="Search By Subscription Id"
                value={filters.deliveryId}
                onChange={handleFilterChange}
                className="border rounded-md px-2 py-1"
              />
              <input
                type="text"
                name="planId"
                placeholder="Search By Plan Id"
                value={filters.planId}
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
                <option value="SCHEDULED">Scheduled</option>
                <option value="ONTHEWAY">On the Way</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Delivery ID</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Delivery Date</th>
                  <th className="px-4 py-2">Delivery Time</th>
                  <th className="px-4 py-2">Delivery Address</th>
                  <th className="px-4 py-2">Plan</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveryLoading ? (
                  <tr>
                    <td colSpan="12">Loading Delivery Details...</td>
                  </tr>
                ) : deliveryError ? (
                  <tr>
                    <td colSpan="12">Error: {deliveryError.message}</td>
                  </tr>
                ) : deliverySubscription &&
                  deliverySubscription.results.length > 0 ? (
                  deliverySubscription.results.map((delivery) => (
                    <tr key={deliverySubscription.id}>
                      <td className="border px-4 py-2">
                        {editedDelivery && editedDelivery.id === delivery.id
                          ? delivery.id
                          : delivery.id}
                      </td>
                      <td className="border px-4 py-2">
                        {editedDelivery && editedDelivery.id === delivery.id
                          ? delivery.subscription.customer
                            ? `${delivery.subscription.customer.first_name} ${delivery.subscription.customer.last_name}`
                            : "N/A"
                          : delivery.subscription.customer
                          ? `${delivery.subscription.customer.first_name} ${delivery.subscription.customer.last_name}`
                          : "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {editedDelivery && editedDelivery.id === delivery.id
                          ? delivery.delivery_date
                          : delivery.delivery_date}
                      </td>
                      <td className="border px-4 py-2">
                        {editedDelivery && editedDelivery.id === delivery.id ? (
                          <input
                            type="time"
                            name="delivery_time"
                            value={editedDelivery.delivery_time}
                            onChange={(e) =>
                              handleInputChange(e, "delivery_time")
                            }
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          delivery.delivery_time
                        )}
                      </td>
                      <td className="border px-4 py-2">address</td>
                      <td className="border px-4 py-2">
                        {editedDelivery && editedDelivery.id === delivery.id
                          ? delivery.subscription.plan.name
                          : delivery.subscription.plan.name}
                      </td>
                      <td className="border px-4 py-2">
                        {editedDelivery && editedDelivery.id === delivery.id ? (
                          <select
                            name="status"
                            value={editedDelivery.status}
                            onChange={(e) => handleInputChange(e, "status")}
                            className="border rounded-md px-2 py-1 w-full"
                          >
                            <option value="SCHEDULED">Scheduled</option>
                            <option value="ONTHEWAY">On the Way</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        ) : (
                          delivery.status
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editedDelivery && editedDelivery.id === delivery.id ? (
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
                            onClick={() => handleEditClick(delivery)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12">No subscription deliveries</td>
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

export default SubscriptionDelivery;
