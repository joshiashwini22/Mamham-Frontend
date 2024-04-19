import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const SubscriptionStatus = () => {
  const [subscriptionStatusData, setSubscriptionStatusData] = useState({
    labels: [],
    datasets: [
      {
        label: "Order Status",
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        data: [],
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/subscription/dashboard/subscriptionlist"
      );
      const statusCount = response.data.subscription_status_counts;
  
      const labels = Object.keys(statusCount).map(
        (status) => `${status} (${statusCount[status]})`
      );
      const statusCounts = Object.values(statusCount);
  
      setSubscriptionStatusData({
        ...subscriptionStatusData,
        labels: labels,
        datasets: [
          {
            ...subscriptionStatusData.datasets[0],
            data: statusCounts,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching delivery status data:", error);
    }
  };
  

  return (
    <div>
      <h3 className="text-red-700 text-4xl font-bold sm:text-2xl text-center">
Delivery Status</h3>
<br/>
      <Pie data={subscriptionStatusData} />
    </div>
  );
};

export default SubscriptionStatus;
