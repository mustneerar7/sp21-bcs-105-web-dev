import React from "react";
import "./Discover.css";
import DiscoverPresentation from "./DiscoverPresentation";

import { AppContext } from "../../context/AppContext";

const Discover = () => {
  const { favoriteSongs, recentlyPlayed } = React.useContext(AppContext);

  return (
    <DiscoverPresentation
      recentlyPlayed={recentlyPlayed}
      favoriteSongs={favoriteSongs}
    />
  );
};

export default Discover;
