const modelSepatu = require("../models/sepatu");

const create = async (req, res) => {
  const body = req.body;
  try {
    await modelSepatu.create(body);
    res.status(201).json({
      status: 201,
      message: "Create new sepatu",
      timestamp: new Date().toLocaleTimeString(),
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

const read = async (req, res) => {
  const queryString = req.query;
  try {
    let [data] = await modelSepatu.read(queryString);
    if (data.length == 1) {
      data = data[0];
    }
    res.status(200).json({
      status: 200,
      message: "Get data sepatu success",
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

const update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    await modelSepatu.update(id, body);
    res.status(200).json({
      status: 200,
      message: `Update sepatu with id ${id} success`,
      timestamp: new Date().toLocaleTimeString(),
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

const hapus = async (req, res) => {
  const id = req.params.id;
  try {
    await modelSepatu.hapus(id);
    res.status(200).json({
      status: 200,
      message: `Delete sepatu with id ${id} success`,
      timestamp: new Date().toLocaleTimeString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

module.exports = {
  create,
  read,
  update,
  hapus,
};
