const db = require("../config/db");

const read = () => {
  const query = `SELECT * FROM merk`;

  return db.execute(query);
};

const readSingle = (merk) => {
  const query = `SELECT * FROM merk where merk='${merk}'`;

  return db.execute(query);
};

const create = (body) => {
  const query = `INSERT INTO merk (merk) VALUES ('${body.merk}')`;

  return db.execute(query);
};

module.exports = {
  read,
  readSingle,
  create,
};
