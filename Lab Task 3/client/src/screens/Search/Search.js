import React, { useContext } from "react";
import "./Search.css";
import CardLarge from "../../compoonents/CardLarge/CardLarge";

import { PlaybackContext } from "../../context/PlaybackContext";

const Search = ({ searchResults }) => {
  const { setCurrentTrack, addSongToQueue } = useContext(PlaybackContext);

  const updateCurrentTrack = (track) => {
    addSongToQueue(track);
    setCurrentTrack(track);
  };

  return (
    // <>
    <div className="SearchContainer">
      <h3>Top results</h3>

      {searchResults ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowX: "scroll",
            height: "340px",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            width: "100%",
            marginLeft: "-8px",
          }}
        >
          {searchResults?.data?.songs?.length > 0 &&
            searchResults?.data?.songs?.map((song) => {
              if (song._id === searchResults?.data?.songs[0]._id) {
                return (
                  <CardLarge
                    key={song._id}
                    title={song.title}
                    description={song.artist}
                    image={song.artwork}
                    year={song.year}
                    height={"260px"}
                    cardClick={() => updateCurrentTrack(song)}
                  />
                );
              } else {
                return (
                  <CardLarge
                    key={song._id}
                    title={song.title}
                    description={song.artist}
                    image={song.artwork}
                    year={song.year}
                    cardClick={() => updateCurrentTrack(song)}
                  />
                );
              }
            })}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
