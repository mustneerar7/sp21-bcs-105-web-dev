var express = require('express');

var app = express();

// enable static content
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("base");
  });

// start the server on port 5000
app.listen(5000);
console.log('Server running on port 5000');