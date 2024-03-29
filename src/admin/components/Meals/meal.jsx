import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../common/useFetch";

const Meal = () => {
  const navigate = useNavigate();
  const {
    data: meals,
    loading,
    error,
    deleteItem,
  } = useFetch("http://127.0.0.1:8000/api/subscription/meals");

  const handleDelete = async (mealId) => {
    try {
      await deleteItem(mealId);
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleEdit = (mealId) => {
    navigate(`/meals-update/${mealId}`);
  };


  return (
    <>
      <Sidebar />
      <div className="bg-white sm:ml-64">
        <section className="bg-white min-h-screen py-12 lg:mx-[10px]">
          <div className="relative overflow-x-auto container">
            <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-center pb-4">
              <div>
                <span className="text-red-700 text-4xl font-bold block mb-4 ">
                  Meals
                </span>
                <a
                  href="/meals-create"
                  className="flex items-center p-2 text-red-700 rounded-lg dark:text-white"
                >
                  <button
                    id="dropdownRadioButton"
                    data-dropdown-toggle="dropdownRadio"
                    className="p-4 rounded inline-flex items-center bg-[#93040B] text-white border border-gray-300"                    
                    type="button"
                  >
                    + Add
                  </button>
                </a>
              </div>
            </div>
            <div className="flex justify-center">

            <table className="table-auto">
              <thead>
                <tr>
                  <th scope="col" className="px-4 py-2">ID</th>
                  <th scope="col" className="px-4 py-2">Name</th>
                  <th scope="col" className="px-4 py-2">Description</th>
                  <th scope="col" className="px-4 py-2">Image</th>
                  <th scope="col" className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading? ( <tr>
                    <td colSpan="11">Loading...</td>
                  </tr>): error ? (
                      <tr>
                    <td colSpan="11">Error: {error.message}</td>
                  </tr>
                  ) :meals && meals.length > 0 ? (
                      meals.map((meal) => (
                  <tr key={meal.id}>
                    <td className="border px-4 py-2">{meal.id}</td>
                    <td className="border px-4 py-2">{meal.name}</td>
                    <td className="border px-4 py-2">{meal.description}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={meal.image}
                        alt="Meal"
                        className="mt-2 w-24 h-24 object-fit rounded-lg"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleEdit(meal.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(meal.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                        >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
                ): (
                    <tr>
                    <td colSpan="11">No meals found</td>
                  </tr>
                )}
              </tbody>
            </table>
                      </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Meal;
