require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");

const token = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth) {
    const token = auth.split(" ")[1];

    jsonwebtoken.verify(token, process.env.RAHASIA, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          timestamp: new Date().toLocaleTimeString(),
          message: "Token invalid",
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      status: 401,
      timestamp: new Date().toLocaleTimeString(),
      message: "Please login first to get token",
    });
  }
};

module.exports = token;
