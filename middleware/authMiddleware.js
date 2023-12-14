const jwt = require("jsonwebtoken");
const jwtKey = "key";

exports.verifyUser = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    req.token = bearer[1];
    jwt.verify(req.token, jwtKey, (err, authData) => {
      if (err) {
        res.status(403).json({ message: "Forbidden" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
