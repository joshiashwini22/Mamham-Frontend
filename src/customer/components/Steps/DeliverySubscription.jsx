import React, { useState, useEffect, useContext } from "react";
import Popup from "../../components/popup";
import DeliveryAddress from "../deliveryAddress";
import { StepperContext } from "../../../context/StepperContext";

const DeliverySubscription = ({ onAddressValidChange }) => {
  const [customerId, setCustomerId] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { userData, setUserData } = useContext(StepperContext);

  // useEffect to save userData to localStorage
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    
  }, [userData]);

  // useEffect to initialize state with localStorage data
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Destructive profile for parsed token
      const { profile } = JSON.parse(token);
      if (profile) {
        // Extract customer id from profile
        const { id: customerId } = profile;
        //Set customer ID in state
        setCustomerId(customerId);
        console.log("Customer ID: ", customerId);

        const { addresses } = profile;
        if (addresses && addresses.length > 0) {
          setAddresses(addresses);
        }
        
        console.log(addresses);
      }
    }
  }, []);

  const handleSelectAddress = (addressId) => {
    setUserData({ ...userData, selectedAddress: addressId });
    setSelectedAddress(addressId);
    localStorage.setItem("subscriptionDeliveryAddress", addressId);
  };

  const handleSaveAddress = (address) => {
    // Logic to save address
    console.log("Address saved:", address);

    // Update addresses state
    const updatedAddresses = [...addresses, address];
    setAddresses(updatedAddresses);

    // Update token with new address
    const token = localStorage.getItem("token");

    if (token) {
      const parsedToken = JSON.parse(token);
      parsedToken.profile.addresses = updatedAddresses;
      localStorage.setItem("token", JSON.stringify(parsedToken));
    }

    setShowPopup(false); // Close the popup after saving
    console.log(selectedAddress);

    // Update addresses in local storage
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const isDataValid = () => {
    return (
      userData.selectedAddress &&
      userData.selectedPlan &&
      userData.startDate &&
      userData.startTime &&
      userData.numberOfDays &&
      userData.numberOfDays !== ""
    );
  };

  useEffect(() => {
    console.log(onAddressValidChange);
    if (onAddressValidChange !== undefined) {
      onAddressValidChange(
        userData.selectedAddress &&
          userData.selectedPlan &&
          userData.startDate &&
          userData.startTime &&
          userData.numberOfDays &&
          userData.numberOfDays !== ""
      );
    }
  }, [userData, onAddressValidChange, isDataValid]);

  

  return (
    <>
      {/* Delivery Address */}
      <div className="card mb-8 shadow-md border border-gray-300">
        <div className="card-header bg-gray-50 py-4 px-6">DELIVERY ADDRESS</div>
        <div className="card-block p-4">
          {/* Address Form */}
          <div className="grid grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div key={address.id}>
                <div
                  className="checkout-address"
                  onClick={() => handleSelectAddress(address.id)}
                >
                  <div className="mr-2">
                    <input
                      id={`address_${address.id}`}
                      name="delivery_address"
                      type="radio"
                      checked={selectedAddress === address}
                      onChange={() => setSelectedAddress(address)}
                      required
                    />
                  </div>
                  <label
                    htmlFor={`address_${address.id}`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <span className="block">{address.label}</span>
                    <span className="block">{address.city}</span>
                    <span className="block">{address.address_line1}</span>
                  </label>
                </div>
              </div>
            ))}
            <div className="col-lg-6">
              <div className="checkout-address align-items-center checkout-address--add-new-da">
                <div className="mr-2">
                  <span className="icomoon icon-add"></span>
                </div>
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Add Delivery Address
                </button>
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <Popup
            onClose={() => setShowPopup(false)}
            content={<DeliveryAddress onSave={handleSaveAddress} />}
          />
        )}
      </div>
    </>
  );
};

export default DeliverySubscription;
