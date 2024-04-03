import React from 'react'
import useFetch from '../../common/useFetch'
import { getCustomerIdFromStorage } from '../../utils/utils';
import Button from '../../common/button';

const CompletedSubscriptions = () => {
    const { data: subsCompleted, loading: subsLoading, error: subsError } = useFetch(`http://127.0.0.1:8000/api/subscription/completed-subscriptions/${getCustomerIdFromStorage()}/${"completed"}`);

    // Function to determine the position of order status on the slider
    const getStatusPosition = (status) => {
        // Map statuses to their corresponding positions
        switch (status) {
            case 'OnGoing':
                return 0;
            case 'Completed':
                return 100;
            case 'Cancelled':
                return 50;
            default:
                return 0;
        }
    };

    return (
        <div>
            <h2 className="text-red-600 text-xl font-bold block mb-4">Completed Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
                {/* Orders */}
                <div className="col-span-3">
                    {/* Orders */}
                    {subsCompleted.map(order => (
                        <div key={order.id} className="card mb-8 shadow-md border border-gray-300">
                            <div className="card-header bg-gray-50 py-4 px-6">
                                <h3>Order #{order.id} | Rs. {order.total} | {order.status}</h3>
                                <p>{order.delivery_time} | {order.delivery_date}</p>
                            </div>
                            <div className="card-block p-4">
                                {/* Order status */}
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={getStatusPosition(order.status)}
                                    readOnly
                                    style={{ width: '100%' }}
                                />
                                <p>{order.status} </p>

                                <div className='grid grid-cols-2 my-3'>
                                    <div className='mr-3'>
                                        <Button purpose={"View More"} />
                                    </div>
                                    <div>
                                        <Button purpose={"Type: Cutomization"} />
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
