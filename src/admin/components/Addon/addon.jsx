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
          <div className="relative overflow-x-auto container">
            <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-center pb-4">
              <div>
                <span className="text-red-700 text-4xl font-bold block mb-4 ">
                  Addons
                </span>
                <a
                  href="/addon-create"
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
                    <th scope="col" className="px-4 py-2">Addon Id</th>
                    <th scope="col" className="px-4 py-2">Name</th>
                    <th scope="col" className="px-4 py-2">Price</th>
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
                    ) :addons && addons.length > 0 ? (
                    addons.map((addon) => (
                    <tr key={addon.id}>
                      <td className="border px-4 py-2">{addon.id}</td>
                      <td className="border px-4 py-2">{addon.name}</td>
                      <td className="border px-4 py-2">{addon.price}</td>
                      <td className="border px-4 py-2">
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
                      <td colSpan="11">No addons found</td>
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

export default Addon;
