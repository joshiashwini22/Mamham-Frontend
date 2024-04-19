import React, { useState, useEffect } from "react";
import axios from "axios";

const SubscriptionTotal = () => {
    const [subscriptionRevenueData, setSubscriptionRevenueData] = useState();
    const [subscriptionTotalData, setSubscriptionTotalData] = useState();
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/subscription/dashboard/subscriptionlist"
            );
            const subscriptionRevenue = response.data.total_revenue;
            const subscriptionTotal = response.data.total_subscriptions;
      
            setSubscriptionRevenueData(subscriptionRevenue);
            setSubscriptionTotalData(subscriptionTotal);
        } catch (error) {
            console.error("Error fetching delivery status data:", error);
        }
    };
      
    return (
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center bg-gray-200 p-4 rounded-lg">
                <div className="text-center">
                    <h1 className="text-xl font-semibold mb-2">Number of Subscriptions</h1>
                    <p className="text-2xl font-bold">{subscriptionTotalData}</p>
                </div>
            </div>
            <div className="flex items-center bg-gray-200 p-4 rounded-lg">
                <div className="text-center">
                    <h1 className="text-xl font-semibold mb-2">Total Subscription Revenue</h1>
                    <p className="text-2xl font-bold">{subscriptionRevenueData}</p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionTotal;
