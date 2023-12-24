// DESC: Custom hook to generate stream url for a song.
// Separate hook implementation for streaming part.

import React, { useState } from "react";
import URLs from "../utils/strings";

const useStream = () => {
  const [url, setUrl] = useState("");

  const generateStreamUrl = React.useCallback(async (body) => {
    try {
      const res = await fetch(URLs.STREAM_SONG, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setUrl(json);
    } catch (error) {
      setUrl(error);
    }
  }, []);

  return { url, generateStreamUrl, setUrl };
};

export default useStream;
