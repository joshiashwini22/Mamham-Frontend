export const getCustomerIdFromStorage = () => {
    // Function to retrieve customer ID from local storage
    const token = localStorage.getItem("token");
    if (token) {
      const { profile } = JSON.parse(token);
      if (profile && profile.id) { // Check if profile exists and contains id
        return profile.id; // Return the customer ID
      }
    }
    return null; // Return null if token or profile doesn't exist
  };