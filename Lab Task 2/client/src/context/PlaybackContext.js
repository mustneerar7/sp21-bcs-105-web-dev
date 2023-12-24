// DESC: This file contains the PlaybackContext
// which is used to manage the global playback state.

import React from "react";

import useStream from "../hooks/useStream";
import URLs from "../utils/strings";

const PlaybackContext = React.createContext();

const PlaybackProvider = ({ children }) => {
  const [isPlaying, setIsplaying] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [hlsUrl, setHlsUrl] = React.useState(null);
  const [queue, setQueue] = React.useState([]);

  const { url, generateStreamUrl, setUrl } = useStream();

  // Save currentTrack to localStorage.
  React.useEffect(() => {
    if (!currentTrack) return;
    localStorage.setItem("currentTrack", JSON.stringify(currentTrack));
  }, [currentTrack]);

  // Get currentTrack from localStorage.
  React.useEffect(() => {
    const currentTrackFromStorage = JSON.parse(
      localStorage.getItem("currentTrack")
    );
    if (currentTrackFromStorage) {
      setCurrentTrack(currentTrackFromStorage);
    }
  }, []);

  // Request stream url.
  React.useEffect(() => {
    if (!currentTrack) return;
    generateStreamUrl({ objectKey: currentTrack.songFile });
  }, [currentTrack]);

  // Create HLS url.
  React.useEffect(() => {
    if (!url) return;
    setHlsUrl(URLs.HLS_PATH + url.message);
    setUrl(null);
  }, [url]);

  // Adds the current song to recently played songs in localStorage.
  const addSongToRecentlyPlayed = () => {
    if (!currentTrack) return;
    if (!localStorage.getItem("recentlyPlayed")) {
      localStorage.setItem("recentlyPlayed", JSON.stringify([]));
    }

    const recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed"));
    const newRecentlyPlayed = [...recentlyPlayed];

    // if recently played has length of 6 remove the last song
    if (newRecentlyPlayed.length === 6) {
      newRecentlyPlayed.pop();
    }

    // Remove the current track from the recently played list if it exists
    const index = newRecentlyPlayed.findIndex(
      (track) => track._id === currentTrack._id
    );
    if (index !== -1) {
      newRecentlyPlayed.splice(index, 1);
    }

    // Add the current track to the beginning of the array.
    newRecentlyPlayed.unshift(currentTrack);

    // Save the new array to localStorage.
    localStorage.setItem("recentlyPlayed", JSON.stringify(newRecentlyPlayed));
  };

  const addSongToQueue = (song) => {

    // if queue is empty, set the current song as the current track
    if (queue.length === 0) {
      setQueue([...queue, song]);
      return;
    }

    // if a song is already in the queue, don't add it again
    const songExists = queue.find((track) => track._id === song._id);
    if (songExists) return;

    // add song right after the current song
    const index = queue.findIndex((track) => track._id === currentTrack._id);

    // if index becomes equal to length of the queue, set the first song as the current track
    if (index === queue.length - 1) {
      setCurrentTrack(queue[0]);
      return;
    }

    const newQueue = [...queue];
    newQueue.splice(index + 1, 0, song);

    setQueue(newQueue);
  };

  return (
    <PlaybackContext.Provider
      value={{
        currentTrack,
        queue,
        hlsUrl,
        isPlaying,
        setIsplaying,
        setCurrentTrack,
        addSongToQueue,
        addSongToRecentlyPlayed,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export { PlaybackContext, PlaybackProvider };
