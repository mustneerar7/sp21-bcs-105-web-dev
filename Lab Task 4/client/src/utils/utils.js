// Utility functions.
// This file is used to store functions that are used in multiple places in the application.
// DRY (Don't Repeat Yourself).

const getTokenFromStorage = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

const getUserFromStorage = () => {
  const user = localStorage.getItem("data");
  return user;
};

const getUserIDFromStorage = () => {
  const user = localStorage.getItem("data");
  const userId = JSON.parse(user)._id;
  return userId;
};

const clearLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("data");
  localStorage.removeItem("currentTrack");
  localStorage.removeItem("recentlyPlayed");
};

const getRecentlyPlayedFromStorage = () => {
  const rps = JSON.parse(localStorage.getItem("recentlyPlayed"));
  return rps;
};

export {
  getTokenFromStorage,
  getUserFromStorage,
  clearLocalStorage,
  getUserIDFromStorage,
  getRecentlyPlayedFromStorage,
};
