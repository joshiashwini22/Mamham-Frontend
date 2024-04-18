import React, { useState, useEffect } from "react";
import KhaltiImg from "../../../assets/images/khalti.png";
import axios from "axios";

const Payment = () => {
  const [customerId, setCustomerId] = useState("");
  const [deliveryDetailsData, setDeliveryDetailsData] = useState(null); // Change initial state to null

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = JSON.parse(token);
      const profile = parsedToken.profile;
      if (profile) {
        setCustomerId(profile.id);
      }
    }
  }, []);

  const handlePlaceOrder = async () => {
    try {
      // Extract data from localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));
      const {
        selectedPlan,
        numberOfDays,
        selectedAddons,
        selectedAddress,
        startDate,
        startTime,
        planTotal,
      } = userData;

      // Format scheduled date
      const formattedScheduledDate = new Date(startDate)
        .toISOString()
        .split("T")[0];

      // Format scheduled time
      let formattedScheduledTime = "";

      if (startTime) {
        const [timeValue, period] = startTime.split(" ");
        const [hours, minutes] = timeValue.split(":");

        if (period === "PM" && hours !== "12") {
          formattedScheduledTime = `${parseInt(hours) + 12}:${minutes.padStart(
            2,
            "0"
          )}:00`;
        } else if (period === 'AM' && hours === '12') {
          formattedScheduledTime = `00:${minutes.padStart(2, "0")}:00`;
        } else {
          formattedScheduledTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
        }
        
        
        console.log(timeValue)
        console.log(period)
        console.log(hours)
        console.log(minutes)
        console.log(formattedScheduledTime)

      }

      const deliverDetailsData = {
        delivery_address: selectedAddress,
        delivery_date: formattedScheduledDate,
        delivery_time: formattedScheduledTime,
      };

      // Set the delivery details data state
      setDeliveryDetailsData(deliverDetailsData);

      // Prepare subscription data
      const subscriptionData = {
        customer: customerId,
        start_date: formattedScheduledDate,
        duration: `${numberOfDays}D`,
        delivery_address: selectedAddress,
        delivery_time: formattedScheduledTime,
        plan: selectedPlan,
        addons: selectedAddons,
        total: planTotal,
        delivery_details: [deliverDetailsData], // Use deliverDetailsData here
      };

      console.log(subscriptionData);
      const accessToken = localStorage.getItem("access_token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/subscription/subscription-order/",
        subscriptionData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(subscriptionData);
      console.log("Subscription placed:", response.data);
      console.log(response.data.online_payment_response.payment_url);
      window.location.replace(
        response.data.online_payment_response.payment_url
      );
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <span className="text-red-600 text-4xl font-bold block mb-4">
          Payment
        </span>
        <span className="text-gray-700 text-2xl font-bold block">
          Almost there! Please proceed to confirm your subscription.
        </span>
      </div>
      <img src={KhaltiImg} alt="Khalti Logo" />
      <button
        className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
        onClick={handlePlaceOrder}
      >
        Pay with Khalti
      </button>
    </div>
  );
};

export default Payment;
