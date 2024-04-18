import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../common/useFetch";
import Navbar from "./navbar";
import Popup from "./components/popup";
import DeliveryAddress from "./components/deliveryAddress";
import { getCustomerIdFromStorage } from "../utils/utils";

const ModifyDelivery = ({ onEdit }) => {
  const { id } = useParams();
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const customerId = getCustomerIdFromStorage();

  const {
    data: deliverySubscription,
    loading: deliveryLoading,
    error: deliveryError,
  } = useFetch(
    `http://127.0.0.1:8000/api/subscription/customer-deliveries/${customerId}/${id}`
  );

  const [editedDelivery, setEditedDelivery] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup

  const handleInputChange = (e, field) => {
    let value;
    if (field === "delivery_address") {
      value = parseInt(e, 10);
    } else if (field === "delivery_time") {
      value = e.target.value;
    } else {
      value = e.target ? e.target.value : e;
    }
    setEditedDelivery((prevOrder) => ({
      ...prevOrder,
      [field]: value,
    }));
  };
  const isTimeInRange = (time) => {
    const selectedHour = parseInt(time.split(":")[0], 10);
    return selectedHour >= 10 && selectedHour <= 20;
  };

  const fetchAddressesForCustomer = async (customerId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/authentication/getaddressforcustomer/${customerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }
      const addressdata = await response.json();
      setAddresses(addressdata.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleSaveAddress = (address) => {
    // Logic to save address
    console.log("Address saved:", address);

    // Update addresses state
    const updatedAddresses = [...addresses, address];
    setAddresses(updatedAddresses);

    // Update token with new address
    const token = localStorage.getItem("token");

    if (token) {
      const parsedToken = JSON.parse(token);
      parsedToken.profile.addresses = updatedAddresses;
      localStorage.setItem("token", JSON.stringify(parsedToken));
    }

    setShowPopup(false); // Close the popup after saving

    // Update addresses in local storage
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const handleEditClick = (delivery) => {
    setEditedDelivery({
      ...delivery,
      subscription: delivery.subscription.id,
      delivery_address: delivery.delivery_address.id,
    });
    if (delivery.delivery_address) {
      fetchAddressesForCustomer(delivery.subscription.customer.id);
    }
  };

  const handleSaveClick = async () => {
    try {
      // Make sure editedDelivery is not null
      if (!editedDelivery) {
        toast.error("Please enter delivery details.");

        return;
      }
      if (!editedDelivery.delivery_time || !editedDelivery.delivery_address) {
        toast.error("Please enter valid delivery details.");
        return;
      }
      if (!isTimeInRange(editedDelivery.delivery_time)) {
        // Handle out of range time selection
        toast.error("Please select a time between 10:00 AM and 8:00 PM.");
        return;
      }

      // Send the updated delivery details to the server
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/subscription/subscription-delivery-details/${editedDelivery.id}/`,
        editedDelivery
      );

      // Check if the request was successful
      if (response.status === 200) {
        // Notify the user about successful update
        toast.success("Delivery details updated successfully!");

        // Optionally, you can perform additional actions such as updating state or navigating to another page
      } else {
        // Notify the user about the failure
        toast.error(
          "Failed to update delivery details. Please try again later."
        );
      }
      window.location.reload();
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error updating delivery details:", error);
      // Notify the user about the error
      toast.error(
        "An error occurred while updating delivery details. Please try again later."
      );
    }
    setEditedDelivery(null);
  };

  const handleCancelClick = () => {
    setEditedDelivery(null);
  };

  const isDeliveryWithin24Hours = (deliveryDate) => {
    const today = new Date();
    const deliveryDateTime = new Date(deliveryDate);
    const timeDifference = deliveryDateTime.getTime() - today.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return hoursDifference > 24;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-10">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Update Delivery Details
            </h3>
            <p className="text-gray-600 mt-2">
              You can modify delivery address or location if required 24 hours before delivery. Please reach out if you have any queries.
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-md ml-2"
              onClick={() => setShowPopup(true)}
            >
              Add Address
            </button>
          </div>
        </div>
        <div className="mt-12 relative h-max overflow-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Delivery Date</th>
                <th className="px-4 py-2">Delivery Time</th>
                <th className="px-4 py-2">Delivery Address</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Delivery details */}
              {deliveryLoading ? (
                <tr>
                  <td colSpan="5">Loading Delivery Details...</td>
                </tr>
              ) : deliveryError ? (
                <tr>
                  <td colSpan="5">Error: {deliveryError.message}</td>
                </tr>
              ) : deliverySubscription &&
                deliverySubscription !== null &&
                deliverySubscription.length > 0 ? (
                deliverySubscription.map((delivery, index) => (
                  <tr key={delivery.id}>
                    <td className="pr-6 py-4 whitespace-nowrap">{index + 1}</td>{" "}
                    <td className="pr-6 py-4 whitespace-nowrap">
                      {editedDelivery && editedDelivery.id === delivery.id
                        ? delivery.delivery_date
                        : delivery.delivery_date}
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap">
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
                    <td className="pr-6 py-4 whitespace-nowrap">
                      {editedDelivery && editedDelivery.id === delivery.id ? (
                        <select
                          name="deliveryAddress"
                          value={editedDelivery.delivery_address}
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
                              {address.label}, {address.address_line1},{" "}
                              {address.city}
                            </option>
                          ))}
                        </select>
                      ) : delivery.delivery_address ? (
                        `${delivery.delivery_address.address_line1}, ${delivery.delivery_address.city}`
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap">
                      {editedDelivery && editedDelivery.id === delivery.id ? (
                        <select
                          name="status"
                          value={editedDelivery.status}
                          onChange={(e) => handleInputChange(e, "status")}
                          className="border rounded-md px-2 py-1 w-full"
                        >
                          <option value="SCHEDULED">Scheduled</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      ) : (
                        delivery.status
                      )}
                    </td>
                    <td className="text-right whitespace-nowrap">
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
                          className={`bg-blue-500 text-white px-2 py-1 rounded-md mr-2 ${
                            isDeliveryWithin24Hours(delivery.delivery_date)
                              ? ""
                              : "disabled:opacity-50 cursor-not-allowed"
                          }`}
                          onClick={() => handleEditClick(delivery)}
                          disabled={
                            !isDeliveryWithin24Hours(delivery.delivery_date)
                          }
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No subscription deliveries</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Popup component */}
        {showPopup && (
          <Popup
            onClose={() => setShowPopup(false)}
            content={<DeliveryAddress onSave={handleSaveAddress} />}
          />
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default ModifyDelivery;
