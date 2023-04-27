const db = require("../config/db");

const create = (body) => {
  const query = `INSERT INTO sepatu (id_merk, model, ukuran, harga, kondisi) 
                    VALUES (${body.id_merk}, '${body.model}', ${body.ukuran}, ${body.harga}, '${body.kondisi}')`;
  return db.execute(query);
};

const read = (queryString) => {
  const eachWhere = Object.keys(queryString);
  if (eachWhere.length == 0) {
    const query = `SELECT merk.merk, sepatu.model, sepatu.ukuran, sepatu.harga, sepatu.kondisi FROM sepatu JOIN merk on sepatu.id_merk = merk.id`;
    return db.execute(query);
  } else {
    let where = "";
    eachWhere.forEach((q) => {
      where += `${q}='${queryString[q]}' AND `;
    });
    where = where.slice(0, -5);
    const query = `SELECT merk.merk, sepatu.model, sepatu.ukuran, sepatu.harga, sepatu.kondisi FROM sepatu JOIN merk on sepatu.id_merk = merk.id WHERE ${where}`;
    return db.execute(query);
  }
};

const update = (id, body) => {
  let update = "";
  const eachUpdate = Object.keys(body);
  eachUpdate.forEach((u) => {
    update += `${u}='${body[u]}', `;
  });
  update = update.slice(0, -2);
  const query = `UPDATE sepatu
                    SET ${update}
                    WHERE id=${id}`;
  return db.execute(query);
};

const hapus = (id) => {
  const query = `DELETE FROM sepatu WHERE id=${id}`;
  return db.execute(query);
};

module.exports = {
  create,
  read,
  update,
  hapus,
};