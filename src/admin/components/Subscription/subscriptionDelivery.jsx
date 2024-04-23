import React, { useState, useEffect } from "react";
import useFetch from "../../../common/useFetch";
import Sidebar from "../../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const SubscriptionDelivery = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const isAdminUser = isAdmin();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);
  
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
    const accessToken = localStorage.getItem("access_token");


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
      if (!response.ok) {
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
  const handleResetFilters = () => {
    // Reset all filter values
    setFilters({
      deliveryDate: "",
      deliveryTime: "",
      deliveryAddress: "",
      status: "",
      subscriptionId: "",
      customerId: "",
      deliveryId: "",
    });
  };


  const handleInputChange = (e, field) => {
    let value;
    if (field === "delivery_address" || field === "planId") {
      value = parseInt(e, 10); // Parse the value as an integer
    } else if (field === "delivery_time") {
      value = e.target.value;
    } else {
      value = e.target ? e.target.value : e; // Keep other fields as they are
    }
    setEditedDelivery((prevOrder) => ({
      ...prevOrder,
      [field]: value,
    }));
  };

  const handleEditClick = (delivery) => {
    setEditedDelivery({ ...delivery,       delivery_address: delivery.subscription.delivery_address.id,       subscription: delivery.subscription.id
    });
    if (delivery.subscription.customer) {
      console.log(delivery.subscription.customer.id)
      fetchAddressesForCustomer(delivery.subscription.customer.id);
    }
  };

  const handleSaveClick = async () => {
    try {
      if (editedDelivery.subscription.customer) {
        editedDelivery.subscription.customer = editedDelivery.subscription.customer.id;
      }
      if (editedDelivery.subscription.plan) {
        editedDelivery.subscription.plan = editedDelivery.subscription.plan.id;
      }
      if (!isTimeInRange(editedDelivery.delivery_time)) {
        // Handle out of range time selection
        toast.error("Please select a time between 10:00 AM and 8:00 PM.");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/subscription/subscription-delivery-details/${editedDelivery.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(editedDelivery),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update delivery");
      }

      const updatedDelivery = await response.json();

      console.log("Delivery successfully updated:", updatedDelivery);

      setEditedDelivery(null);
window.location.reload()

    } catch (error) {
      console.error("Error saving delivery:", error);
    }
  };

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
              <h3 className="text-red-800 text-xl font-bold sm:text-2xl">
                Subscription Delivery
              </h3>
              <p className="text-gray-600 mt-2">
                Deliveries for subscription are listed here. You can use filter to see the deliveries by date.
              </p>
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
              {/* Reset Button */}
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={handleResetFilters}
                >
                Reset Filters
              </button>
            </div>
            {/* Pagination buttons */}
            <div className="flex justify-between my-4">
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
            <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Delivery ID</th>
                  <th className="py-3 px-6">Customer</th>
                  <th className="py-3 px-6">Delivery Date</th>
                  <th className="py-3 px-6">Delivery Time</th>
                  <th className="py-3 px-6">Delivery Address</th>
                  <th className="py-3 px-6">Plan</th>
                  <th className="py-3 px-6">Remarks</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedDelivery && editedDelivery.id === delivery.id
                          ? delivery.id
                          : delivery.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedDelivery && editedDelivery.id === delivery.id
                          ? delivery.subscription.customer
                            ? `${delivery.subscription.customer.first_name} ${delivery.subscription.customer.last_name}`
                            : "N/A"
                          : delivery.subscription.customer
                          ? `${delivery.subscription.customer.first_name} ${delivery.subscription.customer.last_name}`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedDelivery && editedDelivery.id === delivery.id
                          ? delivery.delivery_date
                          : delivery.delivery_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedDelivery && editedDelivery.id === delivery.id
                          ? delivery.subscription.plan.name
                          : delivery.subscription.plan.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedDelivery && editedDelivery.id === delivery.id
                          ? delivery.subscription.remarks
                          : delivery.subscription.remarks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap">
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
      <ToastContainer/>
    </>
  );
};

export default SubscriptionDelivery;
