import React, { useState } from "react";
import Navbar from "./navbar";
import DishSelection from "./components/dishSelection";

function Custom() {
  const categories = ["Base", "Lentil", "Veggie", "Protein", "Pickle"];
  const [selectedDishes, setSelectedDishes] = useState([]);

  // Function to add a selected dish to the cart
  const addSelectedDish = (dish) => {
    console.log(dish);
    setSelectedDishes([...selectedDishes, dish]);
    console.log("Selected dishes:", selectedDishes);

  };

  // Function to remove a selected dish from the cart
  const removeSelectedDish = (index) => {
    const updatedSelectedDishes = [...selectedDishes];
    updatedSelectedDishes.splice(index, 1);
    setSelectedDishes(updatedSelectedDishes);
  };

  // Function to calculate the total price of all selected dishes
  const calculateTotal = () => {
    return selectedDishes.reduce((total, dish) => total + (dish.price * dish.portion), 0);
  };

  return (
    <>
      <div className="bg-gray-200 lg:mx-[180px] h-screen mt-18 ">
        <div className="grid gap-4">
          <div className="flex flex-col items-center mx-44">
            <span className="text-red-600 text-4xl font-bold block mb-4">
              Build your Meal
            </span>
            <span className="text-gray-700 block">
              Lorem ipsum dolor sit amet consectetur. Tellus in sagittis posuere
              diam pharetra. Vitae elit ipsum curabitur nunc at maecenas nec et
              laoreet. Nulla lectus nibh mauris nibh lorem neque velit dictum.
              Netus augue praesent quis neque dolor tortor sapien bibendum.
              Proin elit adipiscing habitant ac.
            </span>
          </div>
          <div className="min-h-full grid lg:grid-cols-2 lg:gap-10 mx-4">
            <div className="build flex flex-col lg:block bg-white/80 border border-gray-500/30 rounded-md py-5">
              {categories.map((category) => (
                <DishSelection
                  key={category}
                  category={category}
                  onAddSelectedDish={addSelectedDish}
                />
              ))}
            </div>
            <div className="build flex flex-col lg:block bg-white/80 border border-gray-500/30 rounded-md py-5">
              <Cart
                selectedDishes={selectedDishes}
                onRemoveSelectedDish={removeSelectedDish}
                calculateTotal={calculateTotal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Cart = ({ selectedDishes, onRemoveSelectedDish, calculateTotal }) => {
  return (
    <div>
      <span className="text-red-600 text-4xl font-bold block mb-4">
        Your Cart
      </span>
      {selectedDishes.map((dish, index) => (
        <div key={index} className="flex items-center justify-between border-b border-gray-400 py-2">
          <div className="flex items-center space-x-4">
            <img
              src={`http://localhost:8000${dish.image}`}
              alt={dish.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <span>{dish.name}</span>
          </div>
          <span>Rs. {dish.price} X </span>
          <span>{dish.portion}</span>

          <span>Rs. {(dish.price * dish.portion).toFixed(2)}</span>
          <button
            onClick={() => onRemoveSelectedDish(index)}
            className="text-red-600 font-semibold"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between mt-4">
        <span className="font-semibold">Total:</span>
        <span>${calculateTotal().toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Custom;
