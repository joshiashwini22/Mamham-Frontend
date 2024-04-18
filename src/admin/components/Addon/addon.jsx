import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../common/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addon = () => {
  const navigate = useNavigate();
  const {
    data: addons,
    loading,
    error,
    deleteItem,
  } = useFetch("http://127.0.0.1:8000/api/subscription/addons");

  const handleDelete = async (addonId) => {
    try {
      await deleteItem(addonId);
    toast.success("The addon is deleted.")

    } catch (error) {
      console.error("Error deleting addon:", error);
    }
  };

  const handleEdit = (addonId) => {
    navigate(`/addon-update/${addonId}`);
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
                    Addons                    
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                <a
                  href="/addon-create"
                  className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                  >
                  <button
                   id="dropdownRadioButton"
                   data-dropdown-toggle="dropdownRadio"
                   className=""
                   type="button"
                    >
                        + Add
                    </button>
                    </a>

                </div>
          </div>
          <div className="mt-12 relative h-max overflow-auto">
          <table className="w-full table-auto text-sm text-left">
                <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">Addon Id</th>
                            <th className="py-3 pr-6">Name</th>
                            <th className="py-3 pr-6">Price</th>
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
                        ) :addons && addons.length > 0 ? (
                          addons.map((addon) => (
                          <tr key={addon.id}>
                            <td className="pr-6 py-4 whitespace-nowrap">{addon.id}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{addon.name}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{addon.price}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">
                              <button
                              onClick={() => handleEdit(addon.id)}
                              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(addon.id)}
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

export default Addon;
