import React from 'react'
import Navbar from './navbar'

const MyOrders = () => {
  return (
    <>
    <div className="bg-gray-200">
      <Navbar />
      <section className="bg-white min-h-screen py-12 lg:mx-[180px]">
        <div className="container">
        <div className="flex flex-col items-center mx-44 py-5">
            <span className="text-red-600 text-4xl font-bold block mb-4">My Orders</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
            {/* Checkout Form */}
            <div className="col-span-2">
                           
             
              {/* Special Instructions */}
              <div className="card mb-8 shadow-md border border-gray-300">
                <div className="card-header bg-gray-50 py-4 px-6">
                  Orders 1
                </div>
                <div className="card-block p-4">
                  {/* Special Instructions Input */}
                  <textarea
                    className="form-control h-24 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Please mention if there are special instructions for the delivery person. (e.g., Beware of Dogs)"
                  ></textarea>
                </div>
              </div>

              
            </div>

           
          </div>
        </div>
      </section>
    </div>
  </>
  )
}

export default MyOrders