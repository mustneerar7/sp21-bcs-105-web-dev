// DESC: Container component for HomeScreen.

import React from "react";
import { getUserFromStorage } from "../../utils/utils";

import useGetApi from "../../hooks/useGetApi";
import HomePresentation from "./HomePresentation";

import { AppContext } from "../../context/AppContext";

import URLs from "../../utils/strings";

const Home = () => {
  const [allSongs, setAllSongs] = React.useState([]);

  const { currentView, setCurrentView, user, setUser } = React.useContext(AppContext);
  const { response, getApi } = useGetApi();

  // Initializer function.
  React.useEffect(() => {
    if (getUserFromStorage()) {
      setUser(JSON.parse(getUserFromStorage()));
    }
  }, []);

  // Function to set all songs.
  React.useEffect(() => {
    if (response?.data?.songs?.length > 0) {
      // Set all songs.
      setAllSongs(response);
    }
  }, [response]);

  async function searchSongService(searchString) {
    if (searchString === "") {
      await getApi(URLs.GET_ALL_SONGS);
      setCurrentView("Good morning");
    } else {
      await getApi(URLs.SEARCH_SONGS + searchString);
      setCurrentView("Search");
    }
  }

  // Return the presentation component.
  return (
    <HomePresentation
      user={user}
      allSongs={allSongs}
      search={searchSongService}
      currentView={currentView}
    />
  );
};

export default Home;
