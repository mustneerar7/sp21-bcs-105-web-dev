const express = require("express");

const Song = require("./models/song");

const createConnection = require("./config/mongodb");

const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const validator = require("./middlewares/validator");

// Open connection to database.
createConnection();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session middleware
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Set view engine
app.set("view engine", "ejs");

// Set static folders
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));

// ROUTES

// Route to get all songs from the database.
app.get("/", async (req, res) => {
  // Get all songs from database
  const allSongs = await Song.find();
  res.render("layout", { title: "Home", songs: allSongs });
});

// Route to add a song to the database.
app.post("/new", validator, async (req, res) => {
  try {
    const { title, artist, album, year, artwork } = req.body;

    // Create Song file name
    // remove spaces from title and artist
    stringTitle = title.replace(/\s/g, "");
    stringArtist = artist.replace(/\s/g, "");

    const songFile = `${stringArtist}-${stringTitle}.mp3`;

    // Create a new song
    const newSong = new Song({ title, artist, album, year, artwork, songFile });

    // Save the new song to your database.
    await newSong.save();

    // Get all songs
    const songs = await Song.find();

    req.session.songs = songs;

    // Redirect to the layout with the songs
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
});

// Route to delete a song from the database.
app.post("/delete/:id", async (req, res) => {
  try {
    const songId = req.params.id;

    await Song.findByIdAndDelete(songId);

    // Get all songs
    const songs = await Song.find();
    req.session.songs = songs;

    // Redirect to the page displaying songs
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
});

// Route to update a song in the database.
app.post("/update/:id", async (req, res) => {
  try {
    const songId = req.params.id;

    const { title, artist, album, year, artwork } = req.body;

    // Create Song file name
    // remove spaces from title and artist
    stringTitle = title.replace(/\s/g, "");
    stringArtist = artist.replace(/\s/g, "");

    const songFile = `${stringArtist}-${stringTitle}.mp3`;

    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      { title, artist, album, year, artwork, songFile },
      { new: true }
    );

    // Get all songs
    const songs = await Song.find();
    req.session.songs = songs;

    // Redirect to the page displaying songs
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
});

app.listen(5500, () => {
  console.log("Server is running on port 5500.");
});
