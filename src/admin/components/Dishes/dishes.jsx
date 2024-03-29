import React, { useState, useEffect } from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../common/useFetch";

const Dishes = () => {
  const navigate = useNavigate();
  const { data: dishes, loading, error, deleteItem } = useFetch('http://127.0.0.1:8000/api/customization/dishes');

  const handleDelete = async (dishId) => {
    try {
      await deleteItem(dishId);
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  const handleEdit = (dishId) => {
    navigate(`/dishes-update/${dishId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Header />
      <Sidebar />
      <div className="bg-gray-200 sm:ml-64">
      <section className="bg-white min-h-screen py-12 lg:mx-[180px]">
        <div className="relative overflow-x-auto container">

        
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <div>
                <a
                  href="/dishes-create"
                  className="flex items-center p-2 text-[#93040B] rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <button
                    id="dropdownRadioButton"
                    data-dropdown-toggle="dropdownRadio"
                    className="inline-flex items-center text-[#93040B] bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-[#93040B] dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    Add
                  </button>
                </a>
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-[#93040B] bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    File
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((dish) => (
                  <tr key={dish.id}>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-all-search" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <td>{dish.name}</td>
                    <td>{dish.price}</td>
                    <td>{dish.description}</td>
                    <td>
                      <img src={dish.image} alt="Dish" className="mt-2 w-24 h-24 object-fit rounded-lg" />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(dish.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dish.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dishes;
