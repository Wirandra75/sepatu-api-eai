const db = require("../config/db");

const getUser = (email) => {
  const query = `SELECT * FROM tb_user WHERE email='${email}'`;

  return db.execute(query);
};

const addUser = (body) => {
  const query = `INSERT INTO tb_user (email, name, password) 
                  VALUES ('${body.email}', '${body.name}', '${hash}')`;

  return db.execute(query);
};

module.exports = {
  getUser,
  addUser,
};
