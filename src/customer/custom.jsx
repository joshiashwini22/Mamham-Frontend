import React from "react";
import Navbar from "./navbar";
import DishSelection from "./components/dishSelection";

function Custom() {
  const categories = ["Base", "Lentil", "Veggie", "Protein", "Pickle"];

  return (
    <>
      <div className="bg-gray-200 lg:mx-[180px] h-screen mt-18 ">
        <div className="grid gap-4">
          <div className=" flex flex-col items-center mx-44">
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
                <DishSelection key={category} category={category} />
              ))}
            </div>
            <div className="build flex flex-col lg:block bg-white/80 border border-gray-500/30 rounded-md py-5">
              2
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Custom;
