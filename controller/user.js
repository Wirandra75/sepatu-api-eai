const modelUser = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");

const getUser = async (req, res) => {
  const body = req.body;

  try {
    let [user] = await modelUser.getUser(body.email);

    if (user.length === 1) {
      user = user[0];
      if (body.password == user.password) {
        jsonwebtoken.sign(
          {
            email: user.email,
            name: user.name,
          },
          process.env.RAHASIA,
          (err, token) => {
            res.status(200).json({
              status: 200,
              message: "Login success",
              timestamp: new Date().toLocaleTimeString(),
              token,
            });
          }
        );
      }
    } else {
      res.status(401).json({
        status: 401,
        message: "Wrong email or password",
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

const addUser = async (req, res) => {
  const body = req.body;
  const [user] = await modelUser.getUser(body.email);

  if (user.length === 1) {
    res.status(400).json({
      status: 400,
      message: "Email already exist",
      timestamp: new Date().toLocaleTimeString(),
    });
  } else {
    try {
      await modelUser.addUser(body);
      res.status(201).json({
        status: 201,
        message: "Register success",
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error,
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  }
};

module.exports = {
  getUser,
  addUser,
};
