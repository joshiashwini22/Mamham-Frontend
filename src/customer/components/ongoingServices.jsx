import React from 'react'
import useFetch from '../../common/useFetch'
import { getCustomerIdFromStorage } from '../../utils/utils';
import Button from '../../common/button';

const OngoingServices = () => {
    const {data: customongoing, loading: customLoading, error: customError} = useFetch(`http://127.0.0.1:8000/api/customization/ongoing-orders/${getCustomerIdFromStorage()}/ongoing/`);
    console.log(customongoing)
    // Function to determine the position of order status on the slider
  const getStatusPosition = (status) => {
    // Adjust position based on your specific requirements
    switch (status) {
      case 'Pending':
        return 0;
      case 'Approved':
        return 20;
      case 'Preparing':
        return 40;
      case 'On the Way':
        return 60;
      case 'Completed':
        return 100;
      default:
        return 0;
    }
  };
  return (
    <div>
        <h2 className="text-red-600 text-xl font-bold block mb-4">Ongoing Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
            {/* Orders */}
            <div className="col-span-3">
              {/* Orders */}
              {customongoing.map(order => (
                  <div className="card mb-8 shadow-md border border-gray-300">
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
                        style={{ width: 'calc(100% - 20px)', marginRight: '10px' }} // Adjust the width and margin
                      />
                      <span>{order.status}</span> {/* Display status name */}
                    </div>
                
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

export default OngoingServices