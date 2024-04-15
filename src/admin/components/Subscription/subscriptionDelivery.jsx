import React, { useState, useEffect } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const {
    data: deliverySubscription,
    loading: deliveryLoading,
    error: deliveryError,
  } = useFetch(
    `http://127.0.0.1:8000/api/subscription/subscription-deliveries/?delivery_date=${filters.deliveryDate}&status=${filters.status}&delivery_id=${filters.deliveryId}&subscription__customer__id=${filters.customerId}&subscription__plan__id=${filters.subscriptionId}&page=${currentPage}&page_size=${itemsPerPage}`
  );
  console.log(deliverySubscription);

  const fetchAddressesForCustomer = async (customerId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/authentication/getaddressforcustomer/${customerId}`
      );
      if (!Response.ok) {
        throw new Error("Failed to fetch address");
      }
      const addressdata = await response.json();
      console.log(addressdata);
      setAddresses(addressdata.addresses);
      console.log(addresses);
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

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (deliverySubscription && deliverySubscription.count) {
      const totalPagesCount = Math.ceil(
        deliverySubscription.count / itemsPerPage
      );
      setTotalPages(totalPagesCount);
    }
  }, [deliverySubscription, itemsPerPage]);

  const isTimeInRange = (time) => {
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
            {/* Pagination buttons */}
            <div className="flex justify-center my-4">
              {currentPage !== 1 && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => handlePageClick(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              )}
              {currentPage !== totalPages && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              )}
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
                      <td className="border px-4 py-2">
                        {/* Delivery Address Dropdown */}
                        {editedDelivery && editedDelivery.id === delivery.id ? (
                          <select
                            name="delivery_address"
                            value={delivery.delivery_address}
                            onChange={(e) =>
                              handleInputChange(
                                e.target.options[e.target.selectedIndex].value,
                                "delivery_address"
                              )
                            }
                            className="border rounded-md px-2 py-1 w-full"
                          >
                            <option value="">Select Address</option>
                            {addresses.map((address) => (
                              <option
                                key={address.id}
                                value={address.id} // Set the address ID as the value
                              >
                                {address.id}: {address.label},
                                {address.address_line1}, {address.city}
                              </option>
                            ))}
                          </select>
                        ) : // Display delivery address
                        delivery.delivery_address ? (
                          `${delivery.delivery_address.address_line1}, ${delivery.delivery_address.city}`
                        ) : (
                          "N/A"
                        )}
                      </td>{" "}
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
