import React, { useState } from "react";
import Navbar from "./navbar";

const NavigationItem = ({ children }) => (
  <div className="flex-auto text-sm lg:text-base">{children}</div>
);

const MealOptionCard = ({ imageUrl, altText, title, onSelect }) => (
  <button
    onClick={onSelect}
    className="flex flex-col pt-4 pr-5 pb-12 pl-20 mx-auto w-full bg-white shadow-sm hover:bg-gray-100 transition-colors duration-300 ease-in-out max-md:px-5 max-md:mt-6 focus:outline-none"
  >
    <div className="flex gap-5 justify-between items-start self-start ml-5 max-md:ml-2.5">
      <img
        loading="lazy"
        src={imageUrl}
        alt={altText}
        className="self-end mt-7 max-w-full aspect-square w-[110px]"
      />
      <div className="self-start bg-white rounded-full h-[35px] stroke-[1px] w-[35px]" />
    </div>
    <div className="mt-20 text-xl lg:text-2xl text-center text-black max-md:mt-10">
      {title}
    </div>
  </button>
);

const mealOptions = [
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4805b82b7eeeb673c0bbaffd93226aa047c98411529a6ab8500e8dc24a954846?apiKey=0dc218c8097a48dfa11ef11e6866bba7&",
    altText: "Regular Diet option",
    title: "Regular Diet",
  },
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fe84be5fb288a9e1bbf4f64b8310f5801eade2695ddd26503cc64056705ef427?apiKey=0dc218c8097a48dfa11ef11e6866bba7&",
    altText: "Weight Loss option",
    title: "Weight Loss",
  },
  // Repeat other meal options as necessary...
];

const mealDurations = [
  {
    title: "7 days",
  },
  {
    title: "15 days",
  },
  {
    title: "30 days",
  },
];

const DietaryOptionSelection = ({ options, selectedOption, onChange }) => (
  <div className="flex gap-3.5 justify-between items-center px-5 text-lg bg-white border-2 border-solid border-red-800 border-opacity-80">
    {options.map((option) => (
      <button
        key={option.title}
        className={`grow self-stretch my-auto whitespace-nowrap ${
          selectedOption === option.title ? "bg-red-300" : ""
        }`}
        onClick={() => onChange(option.title)}
      >
        {option.title}
      </button>
    ))}
  </div>
);

const MealPrepPlan = () => {
  const [selectedDuration, setSelectedDuration] = useState("7 days");

  return (
    <main className="flex flex-col pb-5 bg-zinc-100">
      <Navbar/>
      <div className="bg-gray-200 lg:mx-[180px] h-screen mt-18 ">
        <div className="grid gap-4">
          <div className="flex flex-col items-center mx-44 py-5">
            <span className="text-red-600 text-4xl font-bold block mb-4">
            Your Personalized Meal            </span>
            <span className="text-gray-700 block">
              Select items to create your own dish!
            </span>
          </div>
          <div className="min-h-full grid lg:grid-cols-2 lg:gap-5 mx-4">
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default MealPrepPlan;
