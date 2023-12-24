// DESC: Global string resources.
// A place to put all the strings that will be used in the app.

const URLs = {
  // data service.
  LOG_IN: "http://localhost:8080/api/v1/auth/login",
  GET_ALL_SONGS: "http://localhost:8080/api/v1/songs",
  SEARCH_SONGS: "http://localhost:8080/api/v1/songs/search/",
  FAVORITE_SONGS: "http://localhost:8080/api/v1/users/",
  SIGN_UP: "http://localhost:8080/api/v1/auth/signup/",

  // stream service.
  STREAM_SONG: "http://localhost:5500/stream",
  HLS_PATH: "http://localhost:5500/hls/",
};

export default URLs;
