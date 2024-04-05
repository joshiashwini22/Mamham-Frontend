// Function to retrieve customer ID from local storage
export const getCustomerIdFromStorage = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { profile } = JSON.parse(token);
      if (profile && profile.id) { // Check if profile exists and contains id
        return profile.id; // Return the customer ID
      }
    }
    return null; // Return null if token or profile doesn't exist
  };


// Function to retrieve user ID from local storage
export const getUserIdFromStorage = () => {
  const token = localStorage.getItem("token");

  if(token) {
    const { id } = JSON.parse(token);
    if (id) {
      return id;
    }  
  }
  return null;
}