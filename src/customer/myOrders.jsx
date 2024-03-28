import React from 'react'
import Navbar from './navbar'
import useFetch from '../common/useFetch'
import { getCustomerIdFromStorage } from '../utils/utils';
import CompletedServices from './components/completedServices';
import OngoingServices from './components/ongoingServices';

const MyOrders = () => {
  
  const {data: custom, loading: customLoading, error: customError} = useFetch(`http://127.0.0.1:8000/api/customization/myorders/by-customer/${getCustomerIdFromStorage()}/`);
  console.log(custom)
  return (
    <>
    <div className="bg-gray-200">
      <Navbar />
      <section className="bg-white min-h-screen py-12 lg:mx-[180px]">
        <div className="container">
        <div className="flex flex-col items-center mx-44 py-5">
            <span className="text-red-600 text-4xl font-bold block mb-4">My Orders</span>
          </div>
          <OngoingServices/>
          <CompletedServices/>
        </div>
      </section>
    </div>
  </>
  )
}

export default MyOrders