// DESC: Presentation component for the Player.

import React from "react";
import "./Player.css";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import { Slider } from "@mui/material";
import { PauseCircleFilledRounded } from "@mui/icons-material";
import {
  playerSliderStyles,
  playerButtonStyles,
  playerLikeButtonStyles,
} from "./Styles";

const PlayerPresentation = ({
  currentTrack,
  handlePlayButtonClick,
  getCurrentProgress,
  handleSeek,
  playButtonRef,
  videoRef,
  handleLike,
  isPlaying,
  progressTime,
  completeDuration,
  playNextSong,
  playPreviousSong,
  queue,
  enableControls,
  isFavorite,
}) => {
  return (
    <div className="Player">
      <div className="PlayerHeader">
        <h1 className="PlayerTitle">Now playing</h1>
        <MoreHorizRoundedIcon sx={{ fontSize: 24, marginTop: "16px" }} />
      </div>
      <img
        src={currentTrack?.artwork}
        alt="album artwork"
        className="PlayerImage"
      />
      <div className="PlayerSongData">
        <div>
          <h1 className="PlayerSongTitle">{currentTrack?.title}</h1>
          <h2 className="PlayerSongArtist">{currentTrack?.artist}</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* <a className="PlayerLikeButton" onClick={() => handleLike()}>
            <AddCircleOutlineRoundedIcon
              sx={[{ fontSize: 32 }, playerLikeButtonStyles]}
            />
          </a> */}
          <a className="PlayerLikeButton" onClick={() => handleLike()}>
            {!isFavorite ? (
              <FavoriteBorderRoundedIcon
                sx={[{ fontSize: 32 }, playerLikeButtonStyles]}
              />
            ) : (
              <FavoriteRoundedIcon
                sx={[
                  { fontSize: 24, color: "#00ffff" },
                ]}
              />
            )}
          </a>
        </div>
      </div>
      <Slider
        className="PlayerSlider"
        value={getCurrentProgress() || 0}
        onClick={handleSeek}
        sx={playerSliderStyles}
      />
      <div className="PlayerTime">
        <p className="PlayerTimeCurrent">{progressTime}</p>
        <p className="PlayerTimeTotal">{completeDuration}</p>
      </div>
      <div className="PlayerControls">
        <div className="PlayerControlButton">
          <SkipPreviousRoundedIcon
            sx={playerButtonStyles}
            onClick={() => playPreviousSong()}
          />
        </div>
        <a
          className="PlayerControlButton"
          ref={playButtonRef}
          onClick={handlePlayButtonClick}
        >
          {isPlaying ? (
            <PlayCircleRoundedIcon sx={playerButtonStyles} />
          ) : (
            <PauseCircleFilledRounded sx={playerButtonStyles} />
          )}
        </a>
        <div className="PlayerControlButton">
          <SkipNextRoundedIcon
            sx={playerButtonStyles}
            onClick={() => playNextSong()}
          />
        </div>
        <div>
          <video
            style={{ display: "none" }}
            ref={videoRef}
            autoPlay={currentTrack ? true : false}
          />
        </div>
      </div>
      {queue.length > 0 ? (
        <div style={{ minWidth: 320, margin: 16, marginTop: 24 }}>
          <h2
            style={{
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Up next
          </h2>

          {queue.map((track) => (
            <div
              key={track._id} // Add a unique "key" prop
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor:
                  currentTrack._id === track._id ? "#222222" : "",
                borderRadius: 4,
                marginBottom: 4,
              }}
            >
              <img
                src={track.artwork}
                style={{ width: 48, height: 48, paddingLeft: 8 }}
              />
              <div style={{ margin: 16 }}>
                <h3
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: 14,
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 200,

                    color:
                      track._id === currentTrack._id ? "#00ffff" : "#ffffff",
                  }}
                >
                  {track.title}
                </h3>
                <h4
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 200,
                    margin: 0,
                    fontWeight: 600,

                    color:
                      track._id === currentTrack._id ? "#00ffff" : "#ffffff",
                  }}
                >
                  {track.artist}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PlayerPresentation;
