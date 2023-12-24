const jwt = require("jsonwebtoken");

const jwtValidator = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ status: "fail", message: "Forbidden" });
    }

    req.user = user;
    next();
  });
};

module.exports = jwtValidator;
