import axios from "axios";

import { useEffect, useRef } from "react";

const useAxiosAuth = () => {
  const accessToken = localStorage.getItem('access_token');


  const interceptorRef = useRef(null);

  useEffect(() => {
    interceptorRef.current = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && accessToken !== null && accessToken !== undefined) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(interceptorRef.current);
    };
  }, [authHeader]);

  return axios;
};

export default useAxiosAuth;