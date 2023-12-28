// Validates that the request body contains the required fields for a song.

const validator = (req, res, next) => {
  const { title, artist, album } = req.body;
  if (!title || !artist || !album) {
    return res.status(400).json({
      status: "fail",
      message: "Title, artist, and album are required fields.",
    });
  }
  next();
};

module.exports = validator;
