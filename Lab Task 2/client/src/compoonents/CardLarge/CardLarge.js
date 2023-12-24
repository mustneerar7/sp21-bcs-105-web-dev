// Desc: Stateless component CardLarge.
// Displays song as card in search screen. 

import React from "react";
import "./CardLarge.css";

import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
import { PlayCircleFilled } from "@mui/icons-material";

const CardLarge = ({ title, description, image, year, height, cardClick }) => {
  return (
    <a
      style={{
        border: "none",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "0px",
        margin: "0px",
        cursor: "pointer",
      }}
      onClick={cardClick}
    >
      <div
        className="CardLargeContainer"
        style={{
          backgroundColor: height ? "#222222" : null,
          padding: "10px",
          width: "320px",
          height: height ? height : "60px",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "row",
          margin: "10px",
          marginLeft: "8px",
        }}
      >
        <div className="CardLargeImageContainer">
          {image ? (
            <img
              className="CardLargeImage"
              src={image}
              style={{
                width: height ? "160px" : "60px",
                height: height ? "160px" : "60px",
                objectFit: "cover",
                borderRadius: "2px",
              }}
              alt={title}
            />
          ) : (
            <div
              style={{
                width: height ? "160px" : "60px",
                height: height ? "160px" : "60px",
                backgroundColor: "#111111",
                borderRadius: "2px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: "bold",
                  margin: "0px",
                }}
              >
                <AlbumRoundedIcon sx={{ color: "#222222", fontSize: "48px" }} />
              </p>
            </div>
          )}
        </div>
        <div
          className="CardLargeTextContainer"
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "10px",
            marginTop: "10px",
          }}
        >
          <h3
            className="CardLargeTitle"
            style={{
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "bold",
              margin: "0px",
            }}
          >
            {title}
          </h3>
          <p
            className="CardLargeDescription"
            style={{
              color: "#ffffff",
              fontSize: "14px",
              margin: "0px",
            }}
          >
            {description}
          </p>

          <p
            className="CardLargeDescription"
            style={{
              color: "#ffffff",
              fontSize: "12px",
              marginTop: "8px",
              fontWeight: "bold",
              fontFamily: "InterBold",
              color: "#fafafa",
            }}
          >
            {year}
          </p>
          {height && (
            <button
              style={{
                backgroundColor: "#00ffff",
                color: "#222222",
                fontFamily: "InterBold",
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                marginTop: "8px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                position: "relative",
                marginTop: 124,
                marginLeft: 30,
              }}
            >
              <PlayCircleFilled
                sx={{
                  fontSize: "16px",
                  marginRight: "8px",
                }}
              />
              Play now
            </button>
          )}
        </div>
      </div>
    </a>
  );
};

export default CardLarge;
