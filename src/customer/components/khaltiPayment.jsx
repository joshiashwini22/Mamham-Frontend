import axios from "axios";

const initiateKhaltiPayment = async (payload) => {
  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/", // Replace with your DRF endpoint URL
      payload,
      {
        headers: {
          Authorization: "key test_secret_key_5327491a91ff4f688544e72de574e9f5", // Replace YourAuthToken with your authorization token
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status === 200) {
      const { pidx } = response.data;
      console.log("Payment initiation successful. pidx:", pidx);
      return true; // Indicate success
    } else {
      console.error("Failed to initiate Khalti payment:", response.data);
      return false; // Indicate failure
    }
  } catch (error) {
    console.error("Error initiating Khalti payment:", error);
    return false; // Indicate failure
  }
};

export default initiateKhaltiPayment;
