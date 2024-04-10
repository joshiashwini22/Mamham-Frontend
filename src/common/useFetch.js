import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const accessToken = localStorage.getItem("access_token");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`
        }
        
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, accessToken]);

  // deleteItem and refetch functions remain the same

  return { data, loading, error };
};

export default useFetch;
