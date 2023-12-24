// DESC: Container component for the player.
// Handles the HLS.js player and the playback controls.

import React from "react";
import "./Player.css";

import Hls from "hls.js";

import { AppContext } from "../../context/AppContext";
import { PlaybackContext } from "../../context/PlaybackContext";

import PlayerPresentation from "./PlayerPresentation";

const Player = () => {
  const [progress, setProgress] = React.useState(0);
  const [progressTime, setProgressTime] = React.useState("00:00");
  const [completeDuration, setCompleteDuration] = React.useState("00:00");
  const [enableControls, setEnableControls] = React.useState(true);

  const [isLikedSong, setIsLikedSong] = React.useState(false);

  const { favoriteSongs, getFavoriteSongs } = React.useContext(AppContext);

  const {
    currentTrack,
    hlsUrl,
    isPlaying,
    setIsplaying,
    addSongToRecentlyPlayed,
    queue,
    setCurrentTrack,
    addSongToQueue,
    resetQueue,
  } = React.useContext(PlaybackContext);

  const videoRef = React.useRef(null);
  const playButtonRef = React.useRef(null);

  // Initialize the HLS.js player.
  React.useEffect(() => {
    const video = videoRef.current;
    const hls = new Hls();
    const url = hlsUrl;

    if (!url) return;

    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {});

    // Sets isPlaying to false when the video starts playing.
    video.onplay = () => {
      setIsplaying(false);
    };

    // Sets the progress of the playback.
    const handleTimeUpdate = () => {
      setProgress(getCurrentProgress());
    };

    // set the progress time.
    const handleProgressTime = () => {
      setProgressTime(convertToMinSec(video.currentTime));
    };

    // set the complete duration of the song.
    const handleCompleteDuration = () => {
      setCompleteDuration(convertToMinSec(video.duration));
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("timeupdate", handleProgressTime);
    video.addEventListener("loadedmetadata", handleCompleteDuration);

    // Sets isPlaying to true when the video completes playing.
    video.onended = () => {
      setIsplaying(true);
      playNextSong();
    };

    // disable the controls when the video is loading.
    video.onwaiting = () => {
      setEnableControls(false);
    };

    // Cleanup function.
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("timeupdate", handleProgressTime);
      video.removeEventListener("loadedmetadata", handleCompleteDuration);
      hls.destroy();
    };
  }, [hlsUrl]);

  // Stop the automatic playback on start.
  React.useEffect(() => {
    setIsplaying(true);
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.pause();
  }, []);

  // Stop the playback when the currentTrack is changed.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setProgress(0);
  }, [currentTrack]);

  // Add the played song to Recently Played songs array and save it to localStorage.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!currentTrack) return;

    addSongToQueue(currentTrack);
    addSongToRecentlyPlayed();
  }, [currentTrack]);

  // Handles the play/pause functionality on button click.
  const handlePlayButtonClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.error("Autoplay was prevented: ", error);
      });
    }

    setIsplaying(true);

    // Change playback button look and functionality.
    if (playButtonRef.current) {
      setIsplaying(false);

      // Pause the song.
      playButtonRef.current.onclick = () => {
        video.pause();
        setIsplaying(true);
        playButtonRef.current.onclick = handlePlayButtonClick;
      };
    }
  };

  // Returns the current progress of the playback in percent.
  const getCurrentProgress = () => {
    const video = videoRef.current;
    if (video) {
      return (video.currentTime / video.duration) * 100;
    }
    return 0;
  };

  // Handles the seek functionality.
  const handleSeek = (event) => {
    const video = videoRef.current;
    if (video) {
      const percent = event.nativeEvent.offsetX / event.target.offsetWidth;
      video.currentTime = percent * video.duration;
    }
  };

  // convert the progress time to minutes and seconds
  const convertToMinSec = (progressTime) => {
    const minutes = Math.floor(progressTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(progressTime % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // A function to add a song to favorite songs using a patch request
  const addSongToFavoriteSongs = () => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("data");
    const userId = JSON.parse(user)._id;

    const songId = currentTrack._id;

    setIsLikedSong(!isLikedSong);

    fetch(`http://localhost:8080/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songId: songId }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => getFavoriteSongs());
  };

  // pick next song from the queue and set it as the current track
  const playNextSong = () => {
    // if queue is empty, return
    if (queue.length === 0) return;

    // find next song from the queue by comparing their index
    const index = queue.findIndex((track) => track._id === currentTrack._id);

    // if index becomes equal to length of the queue, set the first song as the current track
    if (index === queue.length - 1) {
      setCurrentTrack(queue[0]);
      return;
    }

    const nextSong = queue[index + 1];
    setCurrentTrack(nextSong);
  };

  const playPreviousSong = () => {
    if (queue.length === 0) return;

    // find previous song from the queue by comparing their index
    const index = queue.findIndex((track) => track._id === currentTrack._id);

    // if index becomes equal to length of the queue, set the first song as the current track
    if (index === 0) {
      setCurrentTrack(queue[queue.length - 1]);
      return;
    }

    const previousSong = queue[index - 1];
    setCurrentTrack(previousSong);
  };

  // if queue is empty, disable the controls
  React.useEffect(() => {
    if (queue.length === 0) {
      setEnableControls(false);
    }
  }, [queue]);

  // if current track is in favorite songs, set isLikedSong to true
  React.useEffect(() => {
    if (favoriteSongs.length === 0) return;

    const isLiked = favoriteSongs?.find((song) => song?._id === currentTrack?._id);

    if (isLiked) {
      setIsLikedSong(true);
    } else {
      setIsLikedSong(false);
    }
  }, [currentTrack, favoriteSongs]);

  // Present the player.
  if (!currentTrack) return <div style={{ marginLeft: 16 }} />;
  return (
    <PlayerPresentation
      currentTrack={currentTrack}
      hlsUrl={hlsUrl}
      videoRef={videoRef}
      playButtonRef={playButtonRef}
      handlePlayButtonClick={handlePlayButtonClick}
      getCurrentProgress={getCurrentProgress}
      handleSeek={handleSeek}
      handleLike={addSongToFavoriteSongs}
      isPlaying={isPlaying}
      progressTime={progressTime}
      completeDuration={completeDuration}
      playNextSong={playNextSong}
      playPreviousSong={playPreviousSong}
      queue={queue}
      enableControls={enableControls}
      isFavorite={isLikedSong}
    />
  );
};

export default Player;
