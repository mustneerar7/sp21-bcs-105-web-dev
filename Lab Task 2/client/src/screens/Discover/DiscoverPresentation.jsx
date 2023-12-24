//DESC: Discover screen presentation component.

import React from "react";
import "./Discover.css";

import CardSmall from "../../compoonents/CardSmall/CardSmall";
import TileCard from "../../compoonents/TileCard/TileCard";

const DiscoverPresentation = ({ recentlyPlayed, favoriteSongs }) => {
  return (
    <div className="DiscoverContainer">
      {recentlyPlayed && (
        <div>
          <h1>Recently played</h1>
          <div className="RecentlyPlayedContainer">
            {recentlyPlayed?.map((song, index) => (
              <CardSmall key={index} song={song} />
            ))}
          </div>
        </div>
      )}

      {favoriteSongs.length >0 && (
        <div>
          <h1>Your Favorites</h1>
          <p className="DiscoverCommonText">From your collection</p>

          <div className="RecentlyPlayedContainer">
            {favoriteSongs?.map((song, index) => (
              <TileCard key={index} song={song} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoverPresentation;
