// DESC: Styles for material-ui components in Player.js

const playerSliderStyles = {
  margin: "18px",
  width: "90%",
  marginBottom: "0px",

  "@media (max-width: 600px)": {
    display: "none",
  },

  color: "#2b2b2b",
  "& .MuiSlider-thumb": {
    width: 8,
    height: 8,
    backgroundColor: "#00ffff",
  },
  "& .MuiSlider-track": {
    borderRadius: 2,
    backgroundColor: "#00ffff",
  },
  "& .MuiSlider-rail": {
    borderRadius: 2,
  },
};

const playerButtonStyles = {
  fontSize: 64,
  color: "#f2f2f2",

  "@media (max-width: 600px)": {
    display: "none",
  },
};

const playerLikeButtonStyles = {
  color: "#f2f2f2",
  fontSize: 24,
  "&:hover": {
    color: "#00ffff",
  },
}

export { playerButtonStyles, playerSliderStyles, playerLikeButtonStyles };
