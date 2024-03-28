import React, { useState, useEffect } from "react";
import axios from "axios";


const DeliveryAddress = ({ onSave }) => {
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [error, setError] = useState("");
  const [customerId, setCustomerId] = useState("");


  useEffect(() => {
    // Retrieve customer ID from the token stored in local storage
    const token = localStorage.getItem("token");
    if (token) {
        const { profile } = JSON.parse(token);
        const { id } = profile;
        setCustomerId(id);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    if (!deliveryLocation || !addressTitle || !latitude || !longitude || !city || !addressLine) {
      setError("Please fill in all fields.");
      return;
    }

    let data = JSON.stringify({
      label: addressTitle,
      address_line1: addressLine,
      city: city,
      latitude: latitude,
      longitude: longitude,
      customer: customerId,
    });

    console.log(data)
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/api/authentication/address/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        onSave(response.data);
        // Reset form fields after successful save if needed
        setDeliveryLocation("");
        setAddressTitle("");
        setLatitude("");
        setLongitude("");
        setCity("");
        setAddressLine("");
      })
      .catch((error) => {
        console.log(error);
        setError("Address save failed. Please try again.");
      });
  };
  return (
    <div className="m-8">
      <h2 className="text-lg font-semibold mb-4 mt-8">Your Delivery Address</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label
            htmlFor="deliveryLocation"
            className="block text-sm font-medium text-gray-700"
          >
            DELIVERY LOCATION *
          </label>
          <input
            type="text"
            id="deliveryLocation"
            name="deliveryLocation"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            placeholder="P8CC+J2 Kathmandu, Nepal"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="addressTitle"
            className="block text-sm font-medium text-gray-700"
          >
            ADDRESS TITLE *
          </label>
          <input
            type="text"
            id="addressTitle"
            name="addressTitle"
            value={addressTitle}
            onChange={(e) => setAddressTitle(e.target.value)}
            placeholder="Enter Title e.g. Home, Office"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <p className="text-red-500 text-sm mt-1">
            Address title is required.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude *
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={latitude}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
    
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="setCity"
              className="text-sm font-medium text-gray-700"
            >
              City*
            </label>
            <select
              id="city"
              className="w-full px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
              name="city"
              value={city}
            onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Select a city</option>
              <option value="Kathmandu-inside">
                Kathmandu Inside Ring Road
              </option>
              <option value="Kathmandu-outside">
                Kathmandu Outside Ring Road
              </option>
              <option value="Lalitpur-inside">Lalitpur Inside Ring Road</option>
              <option value="Lalitpur-outside">
                Lalitpur Outside Ring Road
              </option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="addressLine"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 1 *
          </label>
          <input
            type="text"
            id="addressLine"
            name="addressLine"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            placeholder="Eg: House No., Tole, Area (Lazimpat/Sanepa)"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default DeliveryAddress;
