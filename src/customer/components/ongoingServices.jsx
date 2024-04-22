import React, { useState } from "react";
import useFetch from "../../common/useFetch";
import { getCustomerIdFromStorage } from "../../utils/utils";
import Button from "../../common/button";
import Popup from "./popup";
import ViewMore from "./viewMore";

const OngoingServices = () => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { data: customongoing, loading: customLoading, error: customError } = useFetch(
    `http://127.0.0.1:8000/api/customization/ongoing-orders/${getCustomerIdFromStorage()}/ongoing/`
  );

  // Function to determine the position of order status on the slider
  const getStatusPosition = (status) => {
    switch (status) {
      case "Pending":
        return 0;
      case "Approved":
        return 20;
      case "Preparing":
        return 40;
      case "On the Way":
        return 60;
      case "Completed":
        return 100;
      default:
        return 0;
    }
  };

  const handleViewMore = (orderId) => {
    setSelectedOrderId(orderId);
  };

  return (
    <div>
      <h2 className="text-red-600 text-xl font-bold block mb-4 text-center">Ongoing Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
        {/* Orders */}
        <div className="col-span-3">
          {customongoing.map((order) => (
            <div className="card mb-8 shadow-md border border-gray-300" key={order.id}>
              <div className="card-header bg-gray-50 py-4 px-6">
                <h3>Order ID #C{order.id} | Rs. {order.total} | {order.status}</h3>
                <p>{order.delivery_time} | {order.delivery_date}</p>
              </div>
              <div className="card-block p-4">
                {/* Order status */}
                <div className="flex items-center justify-between">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={getStatusPosition(order.status)}
                    readOnly
                    style={{ width: "calc(100% - 20px)", marginRight: "10px" }}
                  />
                  <span>{order.status}</span>
                </div>

                <div className="grid grid-cols-2 my-3">
                  <div className="mr-3">
                    <Button
                      purpose="View More"
                      onClick={() => handleViewMore(order.id)}
                    />
                  </div>
                  <div>
                    <Button purpose="Type: Customization" />
                  </div>
                </div>
              </div>
            </div>
          ))}
      {selectedOrderId && (
        <Popup
          onClose={() => setSelectedOrderId(null)}
          content={<ViewMore orderId={selectedOrderId} />}
        />
      )}
      </div>
      </div>

    </div>
  );
};

export default OngoingServices;
