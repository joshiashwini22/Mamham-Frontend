import React from 'react'
import useFetch from '../../common/useFetch'
import { getCustomerIdFromStorage } from '../../utils/utils';
import Button from '../../common/button';

const CompletedSubscriptions = () => {
    const { data: subsCompleted, loading: subsLoading, error: subsError } = useFetch(`http://127.0.0.1:8000/api/subscription/completed-subscriptions/${getCustomerIdFromStorage()}/${"completed"}`);

    

    return (
        <div>
            <h2 className="text-red-600 text-xl font-bold block mb-4 text-center">Completed Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
                {/* Orders */}
                <div className="col-span-3">
                    {/* Orders */}
                    {subsCompleted.map(order => (
                        <div
                        key={order.id}
                        className="card mb-8 shadow-md border border-gray-300"
                      >
                        <div className="bg-gray-50 border-b border-gray-200 p-6">
                          <h3 className="text-lg font-semibold">
                            Order #{order.id} | {order.status}
                          </h3>
                        </div>
                        <div className="card-block p-4 ">
                          <div className="grid grid-cols-2 my-3 ml-5">
                            <div className="text-gray-700">
                              <p className="font-semibold">Start Date:</p>
                              <p className="font-semibold">Plan Name:</p>
                              <p className="font-semibold">Number of Days:</p>
                              <p className="font-semibold">Delivery Details:</p>
                              <p className="font-semibold">Delivery Time:</p>
                              <p className="font-semibold">Total:</p>
                            </div>
                            <div className="text-gray-900">
                              <p>{order.start_date}</p>
                              <p>{order.plan.name}</p>
                              <p>{order.duration}</p>
                              <p>
                                {order.delivery_address.label}{" "}
                                {order.delivery_address.address_line1}
                              </p>
                              <p>{order.delivery_time}</p>
                              <p>Rs. {order.total}</p>
                            </div>
                          </div>
          
                          <div className="grid grid-cols-2 my-3">
                            <div className="mr-3">
                              <Button purpose={"Type: Subscription"} />
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CompletedSubscriptions;
