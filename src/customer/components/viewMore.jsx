import React from "react";
import useFetch from "../../common/useFetch";
import { getCustomerIdFromStorage } from "../../utils/utils";

const ViewMore = ({ orderId }) => {
  const {
    data: customOngoing,
    loading: customLoading,
    error: customError,
  } = useFetch(
    `http://127.0.0.1:8000/api/customization/ongoing-orders/${getCustomerIdFromStorage()}/ongoing/`
  );

  const order = customOngoing.find((o) => o.id === orderId);

  if (customLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (customError) {
    return <div className="text-center text-red-600">Error fetching data.</div>;
  }

  if (!order) {
    return <div className="text-center text-gray-600">No order found with the given ID.</div>;
  }

  return (
    <div className="bg-gray-100 max-h-[70vh] flex justify-center items-center overflow-y-auto">
      <div className="container p-6 mt-32">
        <h1 className="text-2xl font-bold mb-6 text-center">Order Details: {order.id}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-full">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              {/* Order-specific information */}
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="font-semibold text-gray-700 border-b pb-2">Order ID</th>
                    <th className="font-semibold text-gray-700 border-b pb-2">Order Date</th>
                    <th className="font-semibold text-gray-700 border-b pb-2">Total Cost</th>
                    <th className="font-semibold text-gray-700 border-b pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4">{order.id}</td>
                    <td className="py-4">{order.delivery_date}</td>
                    <td className="py-4">Rs. {order.total}</td>
                    <td className="py-4">{order.status}</td>
                  </tr>
                </tbody>
              </table>

              {/* Table of items in the order */}
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="font-semibold text-gray-700 border-b pb-2">Product</th>
                    <th className="font-semibold text-gray-700 border-b pb-2">Price</th>
                    <th className="font-semibold text-gray-700 border-b pb-2">Quantity</th>
                    <th className="font-semibold text-gray-700 border-b pb-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.dish_lists.map((dishList, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 flex items-center">
                        <img
                          className=" w-16 rounded mr-4"
                          src={`http://localhost:8000${dishList.dish.image}`}
                          alt={dishList.dish.name}
                        />
                        <span className="font-semibold text-gray-800">{dishList.dish.name}</span>
                      </td>
                      <td className="py-4 text-gray-600">Rs. {dishList.dish.price}</td>
                      <td className="py-4 flex items-center">
                        <span className="text-center w-8 text-gray-700">{dishList.quantity}</span>
                      </td>
                      <td className="py-4 text-gray-600">Rs. {dishList.dish.price * dishList.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMore;
