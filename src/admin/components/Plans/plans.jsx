import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../common/useFetch";

const Plans = () => {
  const navigate = useNavigate();
  const {
    data: plans,
    loading,
    error,
    deleteItem,
  } = useFetch("http://127.0.0.1:8000/api/subscription/plans");

  const handleDelete = async (planId) => {
    try {
      await deleteItem(planId);
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const handleEdit = (planId) => {
    navigate(`/plans-update/${planId}`);
  };


  return (
    <>
      <Sidebar />
      <div className="bg-white sm:ml-64">
        <section className="bg-white min-h-screen py-12 lg:mx-[10px]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-start justify-between md:flex">
              <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Plans                    
                    </h3>
                    <p className="text-gray-600 mt-2">
                        These are the following plans which can be susbcribed by customers
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                <a
                  href="/plans-create"
                  className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                  >
                  <button
                   id="dropdownRadioButton"
                   data-dropdown-toggle="dropdownRadio"
                   className=""
                   type="button"
                    >
                    Add Plan
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
                            <th className="py-3 pr-6">Description</th>
                            <th className="py-3 pr-6">Price</th>
                            <th className="py-3 pr-6">Image</th>
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
                        ) :plans && plans.length > 0 ? (
                          plans.map((plan) => (
                          <tr key={plan.id}>
                            <td className="pr-6 py-4 whitespace-nowrap">{plan.id}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{plan.name}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{plan.description}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{plan.price}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">
                              <img
                                src={plan.image}
                                alt="Plan"
                                className="mt-2 w-24 h-24 object-fit rounded-lg"
                              />                             
                            </td>
                            <td className="pr-6 py-4 whitespace-nowrap">
                              <button
                              onClick={() => handleEdit(plan.id)}
                              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(plan.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded-md"
                            >
                              Delete
                            </button>
                           
                            </td>


                          </tr>
                          ))
                        ): (
                          <tr>
                            <td colSpan="11">No plans found</td>
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

export default Plans;
