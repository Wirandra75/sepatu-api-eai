const db = require("../config/db");
const bcrypt = require("bcrypt");

const getUser = (email) => {
  const query = `SELECT * FROM user WHERE email='${email}'`;

  return db.execute(query);
};

const addUser = (body) => {
  bcrypt.hash(body.password, 10, (err, hash) => {
    const query = `INSERT INTO user (email, name, password) 
                    VALUES ('${body.email}', '${body.name}', '${hash}')`;

    return db.execute(query);
  });
};

module.exports = {
  getUser,
  addUser,
};