import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../common/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dishes = () => {
  const navigate = useNavigate();
  const {
    data: dishes,
    loading,
    error,
    deleteItem,
  } = useFetch("http://127.0.0.1:8000/api/customization/dishes");

  const handleDelete = async (dishId) => {
    try {
      await deleteItem(dishId);
    toast.success("The dish is deleted.")

    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleEdit = (dishId) => {
    navigate(`/dishes-update/${dishId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Sidebar />
      <div className="bg-white sm:ml-64">
        <section className="bg-white min-h-screen py-12 lg:mx-[10px]">
          <div className="relative overflow-x-auto container">
            <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-center pb-4">
              <div>
                <span className="text-red-700 text-4xl font-bold block mb-4 ">
                  Dishes
                </span>
                <a
                  href="/dishes-create"
                  className="flex items-center p-2 text-red-700 rounded-lg dark:text-white"
                >
                  <button
                    id="dropdownRadioButton"
                    data-dropdown-toggle="dropdownRadio"
                    className="p-4 rounded inline-flex items-center bg-red-700 text-white border border-gray-300"
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
                    <th scope="col" className="px-4 py-2">Id</th>
                    <th scope="col" className="px-4 py-2">Name</th>
                    <th scope="col" className="px-4 py-2">Price</th>
                    <th scope="col" className="px-4 py-2">Category</th>
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
                    ) :dishes && dishes.length > 0 ? (
                    dishes.map((dish) => (
                    <tr key={dish.id}>
                      <td className="border px-4 py-2">{dish.id}</td>
                      <td className="border px-4 py-2">{dish.name}</td>
                      <td className="border px-4 py-2">{dish.price}</td>
                      <td className="border px-4 py-2">{dish.category}</td>
                      <td className="border px-4 py-2">{dish.description}</td>
                      <td className="border px-4 py-2">
                        <img
                          src={dish.image}
                          alt="Dish"
                          className="mt-2 w-24 h-24 object-fit rounded-lg"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleEdit(dish.id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dish.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                  ): (
                    <tr>
                      <td colSpan="11">No orders found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <ToastContainer/>
      </div>
    </>
  );
};

export default Dishes;
