// DESC: Context for the app.
// Contains the active configurations of app.

import React from "react";

import useGetApi from "../hooks/useGetApi";
import {
  getRecentlyPlayedFromStorage,
  getUserIDFromStorage,
} from "../utils/utils";

import URLs from "../utils/strings";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const [currentView, setCurrentView] = React.useState("Good morning");
  const [recentlyPlayed, setRecentlyPlayed] = React.useState([]);
  const [favoriteSongs, setFavoriteSongs] = React.useState([]);

  const { getApi } = useGetApi();

  React.useEffect(() => {
    if (user) {
      const recentlyPlayed = getRecentlyPlayedFromStorage();
      setRecentlyPlayed(recentlyPlayed);
      getFavoriteSongs();
    }
  }, [user]);

  const getFavoriteSongs = () => {
    const userId = getUserIDFromStorage();

    getApi(URLs.FAVORITE_SONGS + userId + "/likedSongs").then((data) => {
      setFavoriteSongs(data?.data?.likedSongs);
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        user,
        setUser,
        favoriteSongs,
        recentlyPlayed,
        getFavoriteSongs
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
