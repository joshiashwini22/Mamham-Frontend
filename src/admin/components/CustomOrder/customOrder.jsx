import React, { useState, useEffect } from "react";
import useFetch from "../../../common/useFetch";
import Sidebar from "../../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomOrder = () => {
  const accessToken = localStorage.getItem("access_token");
  const [filters, setFilters] = useState({
    deliveryDate: "",
    deliveryTime: "",
    status: "",
    orderId: "",
  });

  const [editedOrder, setEditedOrder] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: custom,
    loading: customLoading,
    error: customError,
  } = useFetch(
    `http://127.0.0.1:8000/api/customization/get-custom-order/?delivery_date=${filters.deliveryDate}&delivery_time=${filters.deliveryTime}&status=${filters.status}&order_id=${filters.orderId}&page=${currentPage}&page_size=${itemsPerPage}`
  );

  const fetchAddressesForCustomer = async (customerId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/authentication/getaddressforcustomer/${customerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
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
      status: "",
      orderId: "",
    });
  };

  const handleEditClick = (order) => {
    setEditedOrder({ ...order, delivery_address: order.delivery_address.id });
    if (order.customer) {
      fetchAddressesForCustomer(order.customer.id);
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
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [field]: value,
    }));
  };

  const handleSaveClick = async () => {
    if (!isTimeInRange(editedOrder.delivery_time)) {
      // Handle out of range time selection
      toast.error("Please select a time between 10:00 AM and 7:30 PM.");
      return;
    }
    if (editedOrder.customer) {
      editedOrder.customer = editedOrder.customer.id;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/customization/custom-order/${editedOrder.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(editedOrder),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      const updatedOrder = await response.json();

      console.log("Order successfully updated:", updatedOrder);

      setEditedOrder(null);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedOrder(null);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (custom && custom.count) {
      const totalPagesCount = Math.ceil(custom.count / itemsPerPage);
      setTotalPages(totalPagesCount);
    }
  }, [custom, itemsPerPage]);

  const isTimeInRange = (time) => {
    const selectedHour = parseInt(time.split(":")[0], 10);
    return selectedHour >= 10 && selectedHour < 20;
  };

  return (
    <>
      <Sidebar />
      <div className="bg-white sm:ml-64">
        <section className="bg-white min-h-screen py-12 lg:mx-[10px]">
          <div className="relative overflow-x-auto container">
          <div className="flex flex-col items-center mx-44 py-5">
              <h3 className="text-red-800 text-xl font-bold sm:text-2xl">
                Custom Orders
              </h3>
              <p className="text-gray-600 mt-2">
                Here are the order details of custom orders.
              </p>
            </div>
            <div className="flex justify-end mb-4 mx-4 space-x-4">
              <input
                type="text"
                name="orderId"
                placeholder="Search by Order ID"
                value={filters.orderId}
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
                min="10:00"
                max="20:00"
                step="900"
                className="border rounded-md px-2 py-1"
              />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="border rounded-md px-2 py-1"
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Preparing">Preparing</option>
                <option value="On the Way">On the Way</option>
                <option value="Completed">Completed</option>
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
                  <th className="py-3 px-6">Order ID</th>
                  <th className="py-3 px-6">Customer</th>
                  <th className="py-3 px-6">Delivery Address</th>
                  <th className="py-3 px-6">Delivery Date</th>
                  <th className="py-3 px-6">Delivery Time</th>
                  <th className="py-3 px-6">Total</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Payment Method</th>
                  <th className="py-3 px-6">Paid</th>
                  <th className="py-3 px-6">Remarks</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {customLoading ? (
                  <tr>
                    <td colSpan="11">Loading...</td>
                  </tr>
                ) : customError ? (
                  <tr>
                    <td colSpan="11">Error: {customError.message}</td>
                  </tr>
                ) : custom && custom.results.length > 0 ? (
                  custom.results.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedOrder && editedOrder.id === order.id ? (
                          <input
                            type="text"
                            value={editedOrder.id}
                            readOnly
                            className="rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          order.id
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedOrder && editedOrder.id === order.id
                          ? order.customer
                            ? `${order.customer.first_name} ${order.customer.last_name}`
                            : "N/A"
                          : order.customer
                          ? `${order.customer.first_name} ${order.customer.last_name}`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* Delivery Address Dropdown */}
                        {editedOrder && editedOrder.id === order.id ? (
                          <select
                            name="delivery_address"
                            value={editedOrder.delivery_address}
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
                                {address.address_line1}
                              </option>
                            ))}
                          </select>
                        ) : // Display delivery address
                        order.delivery_address ? (
                          `${order.delivery_address.address_line1}`
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedOrder && editedOrder.id === order.id ? (
                          <input
                            type="date"
                            name="delivery_date"
                            value={editedOrder.delivery_date}
                            onChange={(e) =>
                              handleInputChange(e, "delivery_date")
                            }
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          order.delivery_date
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedOrder && editedOrder.id === order.id ? (
                          <input
                            type="time"
                            name="delivery_time"
                            value={editedOrder.delivery_time}
                            min="10:00"
                            max="20:00"
                            onChange={(e) =>
                              handleInputChange(e, "delivery_time")
                            }
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          order.delivery_time
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedOrder && editedOrder.id === order.id ? (
                          order.total
                        ) : (
                          order.total
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedOrder && editedOrder.id === order.id ? (
                          <select
                            name="status"
                            value={editedOrder.status}
                            onChange={(e) => handleInputChange(e, "status")}
                            className="border rounded-md px-2 py-1 w-full"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Preparing">Preparing</option>
                            <option value="On the Way">On the Way</option>
                            <option value="Completed">Completed</option>
                          </select>
                        ) : (
                          order.status
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedOrder && editedOrder.id === order.id ? (
                          <select
                            name="payment_method"
                            value={editedOrder.payment_method}
                            onChange={(e) =>
                              handleInputChange(e, "payment_method")
                            }
                            className="border rounded-md px-2 py-1 w-full"
                          >
                            <option value="Cash On Delivery">
                              Cash On Delivery
                            </option>
                            <option value="Khalti">Khalti</option>
                          </select>
                        ) : (
                          order.payment_method
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedOrder && editedOrder.id === order.id ? (
                          <input
                            type="checkbox"
                            name="isPaid"
                            checked={editedOrder.isPaid}
                            onChange={(e) => handleInputChange(e, "isPaid")}
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : order.isPaid ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedOrder && editedOrder.id === order.id ? (
                          <input
                            type="text"
                            name="remarks"
                            value={editedOrder.remarks}
                            onChange={(e) => handleInputChange(e, "remarks")}
                            className="border rounded-md px-2 py-1 w-full"
                          />
                        ) : (
                          order.remarks
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editedOrder && editedOrder.id === order.id ? (
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
                            onClick={() => handleEditClick(order)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">No orders found</td>
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

export default CustomOrder;
