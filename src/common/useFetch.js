import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("access_token");
    const authorizationHeader = {};
    if (accessToken !== undefined || accessToken !== null) {
      authorizationHeader.Authorization = `Bearer ${accessToken}`;
    }
    try {
      const response = await axios.get(url, {
        headers: { ...authorizationHeader },
      });

      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, deleteItem, refetch };
};

export default useFetch;
