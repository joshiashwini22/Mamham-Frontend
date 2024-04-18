
import React from 'react'
import Navbar from '../customer/navbar'


const PaymentCompletion = () => {
  return (
    <>
    <Navbar/>
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div className="text-center">
    <p className="text-base font-semibold text-indigo-600">Thank you for Ordering</p>
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your payment was successful!</h1>
    <p className="mt-6 text-base leading-7 text-gray-600">You can view order status to keep updated.</p>
  </div>
</main>
    </>
  )
}

export default PaymentCompletion