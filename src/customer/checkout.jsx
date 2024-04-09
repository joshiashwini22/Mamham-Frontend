import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Popup from "./components/popup";
import DeliveryAddress from "./components/deliveryAddress";
import Button from "../common/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState("Cash On Delivery");
  const [deliveryOption, setDeliveryOption] = useState("asap");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [timeOptions, setTimeOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [dishSelection, setDishSelection] = useState([]);
  const [dishList, setDishList] = useState([]);
  const [total, setTotal] = useState(0);
  const [customerId, setCustomerId] = useState("");
  const [remark, setRemark] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = JSON.parse(token);
      const profile = parsedToken.profile;
      if (profile) {
        setCustomerId(profile.id);
        const { addresses } = profile;
        if (addresses && addresses.length > 0) {
          setAddresses(addresses);
          setSelectedAddress(addresses[0])

        }
        console.log(addresses);
      }
      const selectedDishes = localStorage.getItem("selectedDishes");
      console.log(selectedDishes);
      if (selectedDishes) {
        const dishes = JSON.parse(selectedDishes);
        let selectedDishesTotal = 0;
        setDishSelection(dishes);
        setDishList(
          dishes.map((dish) => {
            selectedDishesTotal += dish.price * dish.portion;
            return {
              dish: dish.id,
              quantity: dish.portion,
            };
          })
        );
        console.log(selectedDishesTotal);
        setTotal(selectedDishesTotal);
      }
    }
  }, []);
  

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    let startHour = currentHour;
    let startMinute = Math.ceil(currentMinute / 30) * 30;
    if (startMinute === 60) {
      startHour += 1;
      startMinute = 0;
    }

    const options = [];
    for (let hour = 10; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (
          (hour > currentHour ||
            (hour === currentHour && minute >= startMinute)) &&
          hour < 20
        ) {
          const time = `${hour < 10 ? "0" + hour : hour}:${
            minute < 10 ? "0" + minute : minute
          }`;
          options.push(time);
        }
      }
    }
    setTimeOptions(options);
  }, []);


  useEffect(() => {
    // Reset scheduled time when date changes
    setScheduledTime("");
  }, [scheduledDate]);

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
  };

  const handleScheduledDateChange = (e) => {
    setScheduledDate(e.target.value);
  };

  useEffect(() => {
    handleAsapTimeChange(); // Invoke handleAsapTimeChange when the component mounts
  }, []); // Empty dependency array ensures it runs only once
  
  // Function to handle ASAP time change
  const handleAsapTimeChange = () => {
    // Get the current date and time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
  
    // Find the nearest available time slot based on the current time
    let nearestHour = currentHour;
    let nearestMinute = Math.ceil(currentMinute / 30) * 30;
    if (nearestMinute === 60) {
      nearestHour += 1;
      nearestMinute = 0;
    }
  
    // Log the nearest time before setting the scheduled time
    console.log("Nearest Time:", nearestHour, nearestMinute);
  
    // Set the scheduled time to the nearest possible time for the day
    const nearestTimeString = `${nearestHour < 10 ? "0" + nearestHour : nearestHour}:${nearestMinute < 10 ? "0" + nearestMinute : nearestMinute}`;
    console.log(nearestTimeString); // Update scheduledTime state with the nearest time
    setScheduledTime(nearestTimeString); // Update scheduledTime state with the nearest time
  };
  
  

  const handleScheduledTimeChange = (e) => {
    setScheduledTime(e.target.value);
    console.log(scheduledDate, scheduledTime)
  };

  useEffect(() => {
    if (!scheduledDate) return; // If no date selected, return

    // Parse selected date
    const selectedDate = new Date(scheduledDate);
    const currentDate = new Date();

    // If selected date is today
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      // Filter time options based on current time
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();

      let startHour = currentHour;
      let startMinute = Math.ceil(currentMinute / 30) * 30;
      if (startMinute === 60) {
        startHour += 1;
        startMinute = 0;
      }

      const options = [];
      for (let hour = startHour; hour <= 20; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          if (
            (hour > currentHour ||
              (hour === currentHour && minute >= startMinute)) &&
            hour < 20
          ) {
            const time = `${hour < 10 ? "0" + hour : hour}:${
              minute < 10 ? "0" + minute : minute
            }`;
            options.push(time);
          }
        }
      }
      setTimeOptions(options);
    } else {
      // If selected date is not today, provide full time options
      const options = [];
      for (let hour = 10; hour <= 20; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour < 10 ? "0" + hour : hour}:${
            minute < 10 ? "0" + minute : minute
          }`;
          options.push(time);
        }
      }
      setTimeOptions(options);
    }
  }, [scheduledDate]);

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
  const handlePlaceOrder = async () => {
    try {
      if (!selectedAddress) { // Check if a delivery address is selected
        toast.error("Please select a delivery address");
        return;
      }
      //Payment
      let paymentStatus = "";
      let paidStatus = false;

      if (selectedPaymentOption === "Khalti") {
        
        paymentStatus ="Khalti";

        
      } else {
        paymentStatus = "Cash On Delivery";
      }
      // Format scheduled date
      const formattedScheduledDate = new Date(scheduledDate)
        .toISOString()
        .split("T")[0];

      // Format scheduled time
      const formattedScheduledTime = new Date(`1970-01-01T${scheduledTime}:00`)
        .toISOString()
        .split("T")[1]
        .split(".")[0];

      // Prepare order data
      const orderData = {
        customer: customerId,
        delivery_address: selectedAddress.id,
        delivery_date: formattedScheduledDate,
        delivery_time: formattedScheduledTime,
        total: total,
        remarks: remark,
        payment_method: paymentStatus,
        dish_lists: dishList, // Pass selected dishes
      };

      console.log(orderData);
      // Place order to backend only if payment is successful
      // if (paymentStatus === "Khalti" && !paidStatus) {
      //   alert("Payment not completed. Please complete the payment.");
      //   return;
      // }

      // Place order to backend
      const response = await fetch(
        "http://127.0.0.1:8000/api/customization/custom-order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

    const responseData = await response.json();
      console.log("Order placed:", responseData);
      toast.success("Your order was placed successfully")


      // Check if payment method is Khalti and the payment URL exists
      if (
        selectedPaymentOption === "Khalti" &&
        responseData.online_payment_response.payment_url
      ) {
        console.log(responseData.online_payment_response.payment_url);
        // Redirect to Khalti payment URL
        window.location.replace(
          responseData.online_payment_response.payment_url
        );
      }
      else {

      }

      // Clear selected dishes from local storage
      // localStorage.removeItem("selectedDishes");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(`Error placing order: ${error.message}`)
    }
  };

  useEffect(() => {
    // Calculate the minimum date value 7 days after today's date
    const today = new Date();
    today.setDate(today.getDate());
    const minDateValue = today.toISOString().substr(0, 10);
    setMinDate(minDateValue);
  }, []);


  // Function to calculate total price of selected dishes
  const calculateTotalPrice = () => {
    return dishSelection.reduce(
      (total, dish) => total + dish.price * dish.portion,
      0
    );
  };

  return (
    <>
      <div className="bg-gray-200">
        <Navbar />
        <section className="bg-white min-h-screen py-12 lg:mx-[180px]">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
              {/* Checkout Form */}
              <div className="col-span-2">
                {/* Delivery Address */}
                <div className="card mb-8 shadow-md border border-gray-300">
                  <div className="card-header bg-gray-50 py-4 px-6">
                    DELIVERY ADDRESS
                  </div>
                  <div className="card-block p-4">
                    {/* Address Form */}
                    <div className="grid grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div key={address.id}>
                          <div
                            className="checkout-address"
                            onClick={() => setSelectedAddress(address)}
                          >
                            <div className="mr-2">
                              <input
                                id={`address_${address.id}`}
                                name="delivery_address"
                                type="radio"
                                checked={selectedAddress === address}
                                onChange={() => setSelectedAddress(address)}
                              />
                            </div>
                            <label
                              htmlFor={`address_${address.id}`}
                              onClick={() => setSelectedAddress(address)}
                            >
                              <span className="block">{address.label}</span>
                              <span className="block">{address.city}</span>
                              <span className="block">
                                {address.address_line1}
                              </span>
                            </label>
                          </div>
                        </div>
                      ))}
                      <div className="col-lg-6">
                        <div className="checkout-address align-items-center checkout-address--add-new-da">
                          <div className="mr-2">
                            <span className="icomoon icon-add"></span>
                          </div>
                          <button
                            onClick={() => setShowPopup(true)}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                          >
                            Add Delivery Address
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {showPopup && (
                    <Popup
                      onClose={() => setShowPopup(false)}
                      content={<DeliveryAddress onSave={handleSaveAddress} />}
                    />
                  )}
                </div>

                {/* Delivery Options */}
                <div className="card mb-8 shadow-md border border-gray-300">
                  <div className="card-header bg-gray-50 text-gray-900 py-4 px-6">
                    DELIVERY OPTIONS
                  </div>
                  <div className="card-block p-4">
                    {/* ASAP Delivery */}
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="asap"
                        name="deliveryOption"
                        value="asap"
                        checked={deliveryOption === "asap"}
                        onChange={() => {handleDeliveryOptionChange("asap"); handleAsapTimeChange();}}
                        className="mr-2"
                      />
                      <label htmlFor="asap">ASAP Delivery</label>
                    </div>
                    {/* Scheduled Delivery */}
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="scheduled"
                        name="deliveryOption"
                        value="scheduled"
                        checked={deliveryOption === "scheduled"}
                        onChange={() => handleDeliveryOptionChange("scheduled")}
                        className="mr-2"
                      />
                      <label htmlFor="scheduled">Scheduled Delivery</label>
                      {/* Date Picker for Scheduled Delivery */}
                      {deliveryOption === "scheduled" && (
                        <input
                          type="date"
                          value={scheduledDate}
                          onChange={handleScheduledDateChange}
                          min={minDate} // Set minimum date value
                          className="ml-4 p-2 border border-gray-300 rounded-md"
                        />
                      )}
                    </div>
                    {/* Time Picker for Scheduled Delivery */}
                    {deliveryOption === "scheduled" && (
                      <div className="flex items-center">
                        <select
                          value={scheduledTime}
                          onChange={handleScheduledTimeChange}
                          className="ml-4 p-2 border border-gray-300"
                        >
                          <option value="">Select Time</option>
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Option */}
                <div className="card mb-8 shadow-md border border-gray-300">
                  <div className="card-header bg-gray-50 py-4 px-6">
                    PAYMENT OPTION
                  </div>
                  <div className="card-block p-4">
                    {/* Payment Method Selection */}
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="cash"
                        name="paymentOption"
                        value="Cash On Delivery"
                        checked={selectedPaymentOption === "Cash On Delivery"}
                        onChange={() =>
                          setSelectedPaymentOption("Cash On Delivery")
                        }
                        className="mr-2"
                      />
                      <label htmlFor="cash">Cash on Delivery</label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="khalti"
                        name="paymentOption"
                        value="Khalti"
                        checked={selectedPaymentOption === "Khalti"}
                        onChange={() => setSelectedPaymentOption("Khalti")}
                        className="mr-2"
                      />
                      <label htmlFor="khalti">Khalti</label>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="card mb-8 shadow-md border border-gray-300">
                  <div className="card-header bg-gray-50 py-4 px-6">
                    SPECIAL INSTRUCTIONS
                  </div>
                  <div className="card-block p-4">
                    {/* Special Instructions Input */}
                    <textarea
                      className="form-control h-24 p-2 border border-gray-300 rounded-md w-full"
                      placeholder="Please mention if there are special instructions for the delivery person. (e.g., Beware of Dogs)"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                  <div className="flex justify-between">
                    <Button onClick={handlePlaceOrder} purpose="Place Order" />
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="hidden md:block">
                <div className="sticky-side top-12">
                  <div className="card mb-8 shadow-md">
                    <div className="card-header bg-gray-50 py-4 px-6">
                      My Bag
                    </div>
                    <div className="card-block p-8">
                      {dishSelection.map((dish, index) => (
                        <div key={index} className="mb-4">
                          {/* Dish Name */}
                          <div className="font-bold">{dish.name}</div>
                          {/* Quantity and Price */}
                          <div>
                            {dish.portion}x {dish.name} - Rs. {dish.price}
                          </div>
                          {/* Total Price for the dish */}
                          <div className="font-bold">
                            Total: Rs. {(dish.price * dish.portion).toFixed(2)}
                          </div>
                        </div>
                      ))}
                      {/* Total Price for all selected dishes */}
                      <div className="font-bold">Total Price: Rs. {calculateTotalPrice()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer/>
    </>
  );
};

export default CheckoutPage;
