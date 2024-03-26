import React, { useState, useEffect } from 'react'

const DeliverySubscription = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
  }, []);

  return (
    <div>DeliverySubscription</div>
  )
}

export default DeliverySubscription