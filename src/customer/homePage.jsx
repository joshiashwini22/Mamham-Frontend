import React from "react";
import Navbar from "./navbar";
import MainImg from "../../src/assets/images/main.png";
import { useNavigate } from "react-router-dom";
import Footer from "./components/footer";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="relative bg-gray-200 h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={MainImg}
            alt="Main"
            className=" w-full object-cover h-screen"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="text-white text-center">
            <div className="text-center mt-8">
              <span
                className="text-700 block text-7xl py-4 "
                style={{ color: "#E7E0D2" }}
              >
                Aja K Khane...
              </span>
              <p className="text-orange-500 block text-4xl">
                One Stop for Ghar ko Khana
              </p>
            </div>
            <div className="flex justify-center mt-8 mx-8">
              <button
                className="bg-red-700 hover:bg-red-700 px-8 py-4 mx-8 hover:scale-105 transition-all duration-300 transform rounded-lg font-semibold"
                style={{ color: "#E7E0D2" }}
                onClick={() => navigate("/ourplans")}
              >
                Subscription Plans
              </button>

              <button
                className="bg-red-700 hover:bg-red-700 px-8 py-4 mx-8 hover:scale-105 transition-all duration-300 transform rounded-lg font-semibold"
                style={{ color: "#E7E0D2" }}
                onClick={() => navigate("/custom")}
              >
                Customize your Meal
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Additional Content Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-red-500 rounded-full p-4 text-white mb-4">
                <span className="text-4xl">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">
                We use only the freshest ingredients sourced locally to prepare
                our meals.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-red-500 rounded-full p-4 text-white mb-4">
                <span className="text-4xl">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customized Meals</h3>
              <p className="text-gray-600">
                Customize your meals according to your preferences and dietary
                requirements.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-red-500 rounded-full p-4 text-white mb-4">
                <span className="text-4xl">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Convenient Delivery
              </h3>
              <p className="text-gray-600">
                Enjoy hassle-free delivery right to your doorstep at your
                preferred time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Featured Menu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Dish 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Chicken Tikka Masala
              </h3>
              <p className="text-gray-600">
                Tender pieces of chicken cooked in a rich tomato-based sauce,
                served with basmati rice.
              </p>
            </div>
            {/* Featured Dish 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Vegetable Biryani
              </h3>
              <p className="text-gray-600">
                Aromatic basmati rice cooked with assorted vegetables and
                spices, served with raita.
              </p>
            </div>
            {/* Featured Dish 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Paneer Butter Masala
              </h3>
              <p className="text-gray-600">
                Chunks of paneer cooked in a creamy and mildly spiced
                tomato-based gravy.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8 mx-8">
            <button
              className="bg-red-700 hover:bg-red-700 px-8 py-4 mx-8 hover:scale-105 transition-all duration-300 transform rounded-lg font-semibold"
              style={{ color: "#E7E0D2" }}
              onClick={() => navigate("/ourplans")}
            >
              Subscription Plans
            </button>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-xl font-semibold mb-2">Customized Meals</h3>
          <p className="text-gray-600">
            Customize your meals according to your preferences and dietary
            requirements.
          </p>
          <button
            className="bg-red-700 hover:bg-red-700 px-8 py-4 mx-8 mt-8 hover:scale-105 transition-all duration-300 transform rounded-lg font-semibold"
            style={{ color: '#E7E0D2' }}
            onClick={() => navigate('/custom')}
          >
            Customize Your Meal
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
