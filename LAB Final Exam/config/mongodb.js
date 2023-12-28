// open connection to mongodb using mongoose

const mongoose = require("mongoose");

mongoose.connect(
  "YOUR_MONGODB_URL",
);

function openConnection() {
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error:"));

  db.once("open", () => {
    console.log("MongoDB connection successful");
  });
}

module.exports = openConnection;
