// Desc: Stateless component CardSmall.
// Displays songs in recents section on discover screen.

import React from "react";
import "./CardSmall.css";

import { PlaybackContext } from "../../context/PlaybackContext";

const CardSmall = ({ song }) => {
  const { setCurrentTrack, currentTrack, addSongToQueue, resetQueue } = React.useContext(PlaybackContext);

  return (
    <a className="CardSmallContainer" onClick={() => {
      addSongToQueue(song)
      setCurrentTrack(song)
      }}>
      <img className="CardSmallCover" src={song?.artwork} alt="cover" />
      <div className="CardSmallTextContainer">
        <h4
          className="CardSmallTitle"
          style={{
            color: currentTrack?.title === song?.title ? "#00ffff" : "#fff",
          }}
        >
          {song.title}
        </h4>
        <p
          style={{
            color: currentTrack?.title === song?.title ? "#00ffff" : "#fff",
          }}
          className="CardSmallSubTitle"
        >
          {song?.artist}
        </p>
      </div>
    </a>
  );
};

export default CardSmall;
