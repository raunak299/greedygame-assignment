import { useState } from "react";
import { useCallback } from "react";

const useHTTP = () => {
  const [isLoading, setLoading] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setLoading(true);
    try {
      let response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? requestConfig.body : null,
        headers: requestConfig.headers
          ? requestConfig.headers
          : { "content-type": "application/json" },
      });

      if (!response.ok) {
        console.log("*");
        throw new Error();
      }

      let responseData = await response.json();
      //   console.log(responseData);
      applyData(responseData);
    } catch (err) {
      // setError(err.message);
      console.log(err.message);
    }
    setTimeout(() => setLoading(false), 500);
    // setLoading(false);
  }, []);

  return {
    isLoading,
    sendRequest,
  };
};

export default useHTTP;
