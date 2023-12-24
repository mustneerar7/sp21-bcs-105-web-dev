// Desc: Statelesss component TileCard.
// Displays song as tile on discover page.

import React from "react";
import "./TileCard.css";

import { PlaybackContext } from "../../context/PlaybackContext";

const TileCard = ({ song }) => {
  const { currentTrack, setCurrentTrack, addSongToQueue } =
    React.useContext(PlaybackContext);
  return (
    <a
      className="TileCardSmallContainer"
      onClick={() => {
        addSongToQueue(song);
        setCurrentTrack(song);
      }}
    >
      <img className="TileCardSmallCover" src={song?.artwork} alt="cover" />
      <div className="TileCardSmallTextContainer">
        <h4
          className="TileCardSmallTitle"
          style={{
            color: currentTrack?.title === song?.title ? "#00ffff" : "#fff",
          }}
        >
          {song?.title}
        </h4>
        <p
          style={{
            color: currentTrack?.title === song?.title ? "#00ffff" : "#fff",
          }}
          className="TileCardSmallSubTitle"
        >
          {song?.artist}
        </p>
      </div>
    </a>
  );
};

export default TileCard;
