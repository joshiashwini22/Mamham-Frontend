import React from 'react'
import Navbar from '../../common/client/navbar'
import MainImg from "../../../src/assets/images/main.png";

function HomePage() {
  return (
    <>
      <Navbar/>
      <div className="relative bg-gray-200 h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
              src={MainImg}
              alt="Main"
              className=" w-full object-cover h-screen"
            />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-center mt-8">
              <span className="text-orange-500 font-poppins text-4xl">One Stop for Ghar ko Khana</span>
              <span className="text-gray-400 block text-7xl font-poppins">Aja K Khane...</span>
            </div>
            <div className="flex justify-center mt-8">
              <div className="bg-red-700 text-white font-poppins text-2xl px-8 py-4 rounded-t-xl w-full text-center">Customize your Meal</div>
              <div className="bg-red-700 text-white font-poppins text-2xl px-8 py-4 rounded-t-xl w-full text-center">Subscription Plans</div>
            </div>
          </div>
        </div>
      </div>
      <div>
    </div>
    </>
  )
}

export default HomePage