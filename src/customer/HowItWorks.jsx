import React from "react";
import Navbar from "./navbar";
import Footer from "./components/footer";
import Preferences from '../../src/assets/images/preferences.jpg';
import DeliveryOptions from '../../src/assets/images/delivery-options.jpg';
import ModifyDelivery from '../../src/assets/images/modify-delivery.jpg';
import Khalti from '../../src/assets/images/khaltiPayment.png';
import Dishes from '../../src/assets/images/Dishes.jpg';
import Schedule from '../../src/assets/images/Schedule.jpg';


const HowItWorks = () => {
  return (
    <>
    <div className="bg-white-200 h-screen">
  <Navbar />
    <span className="text-red-600 text-4xl text-center font-bold block my-4 p-3">How it Works</span>

<div class="text-center p-3">
  <h1 class="font-bold text-3xl mb-4">Take Subscription</h1>
  <h1 class="text-2xl">How Subscription works!</h1>
</div>

<section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 px-10">

  <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img src={ Preferences } alt="Select your preferences" class="h-80 w-72 object-cover rounded-t-xl" />
      <div class="px-4 py-3 w-72">
        <p class="text-lg font-bold text-black truncate block capitalize">Select your preferences</p>
        <div class="flex items-center">
         
        </div>
      </div>
  </div>

  <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img src={DeliveryOptions} alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
      <div class="px-4 py-3 w-72">
        <p class="text-lg font-bold text-black truncate block capitalize">Choose Delivery Options</p>
        <div class="flex items-center">
         
        </div>
      </div>
  </div>

  <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img src={Khalti} alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
      <div class="px-4 py-3 w-72">
        <p class="text-lg font-bold text-black truncate block capitalize">Choose Payment Option</p>
        <div class="flex items-center">
         
        </div>
      </div>
  </div>

  <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img src={ModifyDelivery} alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
      <div class="px-4 py-3 w-72">
        <p class="text-lg font-bold text-black truncate block capitalize">Modify Delivery</p>
        <div class="flex items-center">
         
        </div>
      </div>
  </div>

  

</section>

<div class="text-center p-10">
  <h1 class="font-bold text-3xl mb-4">Want to try our food?</h1>
  <h1 class="text-2xl">Try out our customized order!</h1>
</div>

<section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 px-10">

  <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img src={Dishes}  alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
      <div class="px-4 py-3 w-72">
        <p class="text-lg font-bold text-black truncate block capitalize">Select dishes</p>
        <div class="flex items-center">
         
        </div>
      </div>
  </div>

  <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img src={Schedule} alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
      <div class="px-4 py-3 w-72">
        <p class="text-lg font-bold text-black truncate block capitalize">Schedule Delivery</p>
        <div class="flex items-center">
         
        </div>
      </div>
  </div>

  <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img src={Khalti} alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
      <div class="px-4 py-3 w-72">
        <p class="text-lg font-bold text-black truncate block capitalize">Payment with Khalti</p>
        <div class="flex items-center">
         
        </div>
      </div>
  </div>  
</section>



    <Footer />
    </div>
    </>
  )
}

export default HowItWorks