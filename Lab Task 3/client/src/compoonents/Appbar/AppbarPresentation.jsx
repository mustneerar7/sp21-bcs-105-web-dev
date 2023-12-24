// Desc: Presentation component for the Appbar.

import React from "react";
import "./Appbar.css";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import Menu from "./Menu";

const AppbarPresentation = ({
  currentView,
  search,
  searchTerm,
  setSearchTerm,
  openMenu,
  toggleMenu,
  user,
}) => {
  return (
    <div className="Appbar">
      <div className="VerticalAppbarContainer">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width:"240px",
          }}
        >
          {currentView !== "Good morning" ? (
            <button
              className="BackButton"
              style={{
                marginLeft: 20,
                color: "white",
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={() => search("")}
            >
              <ArrowBackIosRoundedIcon sx={{ color: "white" }} />
            </button>
          ) : null}

          <div style={{ margin: 20, width: 400 }}>
            <h1 className="Title">
              {currentView ? currentView : "Good morning"}
            </h1>
          </div>
        </div>

        <div className="SearchAvatarContainer">
          <input
            type="text"
            placeholder="Search"
            className="Search"
            autoFocus
            onKeyDownCapture={(e) => {
              setSearchTerm(e.target.value);
            }}
          />

          <button
            className="SearchButton"
            onClick={() => {
              if (searchTerm === "") {
                document.getElementsByClassName("Search")[0].focus();
                document.getElementsByClassName("Search")[0].placeholder =
                  "Please enter a song name";
              }
              search(searchTerm);
              // clear searchbar after search
              document.getElementsByClassName("Search")[0].value = "";
            }}
          >
            <SearchRoundedIcon sx={{ color: "#ffffff", fontSize: "20px" }} />
          </button>

          <button
            onClick={() => {
              toggleMenu();
            }}
            className="AvatarButton"
          >
            <AccountCircleOutlinedIcon
              sx={{
                color: "#888888",
                fontSize: "32px",
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: "none",
                marginLeft: "8px",
                marginRight: "8px",
              }}
            />
            {/* <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="Avatar"
            /> */}
          </button>
          {openMenu && <Menu user={user} menuCloseCallback={toggleMenu} />}
        </div>
      </div>
    </div>
  );
};

export default AppbarPresentation;
