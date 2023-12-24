// Desc: Home screen presentation component.

import React from "react";
import "./Home.css";

import Appbar from "../../compoonents/Appbar/Appbar";
import Player from "../../compoonents/Player/Player";
import Search from "../Search/Search";
import Discover from "../Discover/Discover";
import Profile from "../Profile/Profile";

const HomePresentation = ({ user, allSongs, search, currentView }) => {

  return (
    /*Horizontal parent container.*/
    <div className="Home">

      {/*Player component.*/}
      <Player />

      {/*Vertical container for content.*/}
      <div className="ContentContainer">
        <Appbar user={user} search={search}/>
        {
          (currentView === "Search" && <Search searchResults={allSongs} />) ||
          (currentView === "Good morning" && <Discover />) ||
          (currentView === "Profile" && <Profile />)
        }
      </div>
    </div>
  );
};

export default HomePresentation;
