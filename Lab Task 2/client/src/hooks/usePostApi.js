// Desc: Custom hook to make POST requests

import React from "react";

const usePostApi = () => {
  const [response, setResponse] = React.useState(null);

  const post = React.useCallback(async (url, body) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      setResponse(error);
    } finally {
    }
  }, []);

  return { response, post };
};

export default usePostApi;
