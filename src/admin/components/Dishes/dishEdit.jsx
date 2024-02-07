import React, { useState, useEffect } from 'react';
import Header from "../../header";
import Sidebar from "../../sidebar";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const DishEdit = ({onEdit }) => {
  const {id} = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Fetch the current dish data when the component mounts
    const fetchData = async () => {
      try {
        let url = `http://127.0.0.1:8000/api/customization/dishes/${id}` ;
        const response = await axios.get(url);
        const { name, price, description, image } = response.data;
        setName(name);
        console.log(id);
        setPrice(price);
        setDescription(description);
        setImage(image);
      } catch (error) {
        console.error('Error fetching dish data:', error);
      }
    };

    fetchData();
  }, [id]);
  

  const handleImageChange = (e) => {
    // Update the state with the selected image file
    setImage(e.target.files[0]);
  };

  const handleEditDish = async () => {
    try {
      // Create a FormData object and append text and file data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);

      const response = await axios.put(`http://127.0.0.1:8000/api/customization/dishes/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Dish updated:', response.data);

      // Notify the parent component about the update
      if (onEdit) {
        onEdit(response.data);
      }
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };
  return (
    <>
    <Header />
    <Sidebar />
    
    <section className="bg-white dark:bg-gray-900">
      
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update Dish - 
        </h2>
        <form>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Title"
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price per unit
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="imageUpload"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleEditDish}
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center border border-gray-300 text-blue bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Update 
          </button>
        </form>
      </div>
    </section>
  </>
  )
}

export default DishEdit
