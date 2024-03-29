import React, { useState } from 'react';
import useFetch from '../../../common/useFetch';
import { getCustomerIdFromStorage } from '../../../utils/utils';
import Header from '../../header';
import Sidebar from '../../sidebar';

const CustomOrder = () => {
  const [filters, setFilters] = useState({
    deliveryDate: '',
    deliveryTime: '',
    status: '',
    orderId: '',
  });

  const { data: custom, loading: customLoading, error: customError } = useFetch(
    `http://127.0.0.1:8000/api/customization/custom-order/?delivery_date=${filters.deliveryDate}&delivery_time=${filters.deliveryTime}&status=${filters.status}&order_id=${filters.orderId}`
  );
  console.log(`http://127.0.0.1:8000/api/customization/custom-order/?delivery_date=${filters.deliveryDate}&delivery_time=${filters.deliveryTime}&status=${filters.status}&order_id=${filters.orderId}`);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  console.log(filters)
  return (
    <div className="bg-gray-200">
      <Header/>
      <Sidebar/>
      <section className="bg-white min-h-screen py-12 lg:mx-[180px]">
        <div className="relative overflow-x-auto container">
          <div className="flex flex-col items-center mx-44 py-5">
            <span className="text-red-600 text-4xl font-bold block mb-4">All Orders</span>
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
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Delivery Address</th>
                <th className="px-4 py-2">Delivery Date</th>
                <th className="px-4 py-2">Delivery Time</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Remarks</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Payment Method</th>
                <th className="px-4 py-2">Paid</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customLoading ? (
                <tr>
                  <td colSpan="11">Loading...</td>
                </tr>
              ) : customError ? (
                <tr>
                  <td colSpan="11">Error: {customError.message}</td>
                </tr>
              ) : custom && custom.length > 0 ? (
                custom.map(order => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{order.id}</td>
                    <td className="border px-4 py-2">{order.customer}</td>
                    <td className="border px-4 py-2">{order.delivery_address}</td>
                    <td className="border px-4 py-2">{order.delivery_date}</td>
                    <td className="border px-4 py-2">{order.delivery_time}</td>
                    <td className="border px-4 py-2">{order.total}</td>
                    <td className="border px-4 py-2">{order.remarks}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                    <td className="border px-4 py-2">{order.payment_method}</td>
                    <td className="border px-4 py-2">{order.isPaid ? 'Yes' : 'No'}</td>
                    <td className="border px-4 py-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
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
  );
};

export default CustomOrder;
