const modelMerk = require("../models/merk");

const read = async (req, res) => {
  try {
    const [data] = await modelMerk.read();
    res.status(200).json({
      status: 200,
      message: "Get data merk",
      timestamp: new Date().toLocaleTimeString(),
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

const create = async (req, res) => {
  const merk = req.body.merk;
  const body = req.body;
  const [merkCheck] = await modelMerk.readSingle(merk);

  if (merkCheck.length === 1) {
    res.status(400).json({
      status: 400,
      message: "Merk already exist",
      timestamp: new Date().toLocaleTimeString(),
    });
  } else {
    try {
      await modelMerk.create(body);
      res.status(201).json({
        status: 201,
        message: "Create new merk success",
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        serverMessage: error,
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  }
};

module.exports = {
  read,
  create,
};
