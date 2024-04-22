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

  console.log(dishes)
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
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-start justify-between md:flex">
              <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Dishes                    
                    </h3>
                    <p className="text-gray-600 mt-2">The following dishes are present for custom orders.</p>
                </div>
                <div className="mt-3 md:mt-0">
                <a
                  href="/dishes-create"
                  className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                  >
                  <button
                   id="dropdownRadioButton"
                   data-dropdown-toggle="dropdownRadio"
                   className=""
                   type="button"
                    >
                        Add Dish
                    </button>
                    </a>

                </div>
          </div>
          <div className="mt-12 relative h-max overflow-auto">
          <table className="w-full table-auto text-sm text-left">
                <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">Id</th>
                            <th className="py-3 pr-6">Name</th>
                            <th className="py-3 pr-6">Price</th>
                            <th className="py-3 pr-6">Category</th>
                            <th className="py-3 pr-6">Description</th>
                            <th className="py-3 pr-6">Image</th>
                            <th className="py-3 pr-6">Availability</th>
                            <th className="py-3 pr-6">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {loading? ( <tr>
                          <td colSpan="11">Loading...</td>
                        </tr>): error ? (
                          <tr>
                          <td colSpan="11">Error: {error.message}</td>
                        </tr>
                        ) :dishes && dishes.length > 0 ? (
                        dishes.map((dish) => (
                          <tr key={dish.id}>
                            <td className="pr-6 py-4 whitespace-nowrap">{dish.id}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{dish.name}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{dish.price}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{dish.category}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{dish.description}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">
                              <img
                                src={dish.image}
                                alt="Dish"
                                className="mt-2 w-24 h-24 object-fit rounded-lg"
                              />                             
                            </td>
                            <td className="pr-6 py-4 whitespace-nowrap">{dish.isAvailable ? "Yes" : "No"}</td>

                            <td className="pr-6 py-4 whitespace-nowrap">
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
                            <td colSpan="11">No dishes found</td>
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

export default Dishes;
