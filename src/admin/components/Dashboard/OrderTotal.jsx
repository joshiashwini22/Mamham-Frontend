import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderTotal = () => {
    const [orderRevenueData, setOrderRevenueData] = useState();
    const [orderTotalData, setOrderTotalData] = useState();
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/customization/dashboard/order"
            );
            const orderRevenue = response.data.total_revenue;
            const orderTotal = response.data.total_orders;
      
            setOrderRevenueData(orderRevenue);
            setOrderTotalData(orderTotal);
        } catch (error) {
            console.error("Error fetching delivery status data:", error);
        }
    };
      
    return (
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center bg-gray-200 p-4 rounded-lg">
                <div className="text-center">
                    <h1 className="text-xl font-semibold mb-2">Number of Custom Orders</h1>
                    <p className="text-2xl font-bold">{orderTotalData}</p>
                </div>
            </div>
            <div className="flex items-center bg-gray-200 p-4 rounded-lg">
                <div className="text-center">
                    <h1 className="text-xl font-semibold mb-2">Total Custom Order Revenue</h1>
                    <p className="text-2xl font-bold">{orderRevenueData}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderTotal;
