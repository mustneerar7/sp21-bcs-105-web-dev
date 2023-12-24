// DESC: This hook is used to make a GET request to the API.

import React from "react";
import { getTokenFromStorage } from "../utils/utils";

const useGetApi = () => {
  const [response, setResponse] = React.useState([]);

  const getApi = async (url) => {
    const token = getTokenFromStorage();
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      setResponse(data);
      return data;
    } catch (error) {
      setResponse(response);
      return response;
    }
  };

  return { response, getApi };
};

export default useGetApi;
