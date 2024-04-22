import React from 'react'
import Navbar from './navbar'
import useFetch from '../common/useFetch'
import { getCustomerIdFromStorage } from '../utils/utils';
import OngoingSubscriptions from './components/ongoingSubscriptions';
import CompletedSubscriptions from './components/completedSubscriptions';

const MySubscriptions = () => {
  
  const {data: subs, loading: customLoading, error: customError} = useFetch(`http://127.0.0.1:8000/api/subscription/mysubscriptions/by-customer/${getCustomerIdFromStorage()}/`);
  console.log(subs)
  return (
    <>
    <div className="bg-gray-200">
      <Navbar />
      <section className="bg-white min-h-screen lg:mx-[180px]">
        <div className="container">
        <div className="flex flex-col items-center mx-44 py-5">
            <span className="text-red-600 text-4xl font-bold block mb-4">My Subscriptions</span>
          </div>
          <OngoingSubscriptions/>
          <CompletedSubscriptions/>
        </div>
      </section>
    </div>
  </>
  )
}

export default MySubscriptions