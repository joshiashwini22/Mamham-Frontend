import React, { useEffect } from 'react'

const DeliverySubscription = () => {
  useEffect(() => {
    localStorage.setItem('registrationCompleted', 'true');
    
  },[]);
  return (
    <div>DeliverySubscription</div>
  )
}

export default DeliverySubscription