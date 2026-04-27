const db = require('../config/db');




const guardarTasa = async (nombre, valor) => {
  const sql = `
    INSERT INTO configuraciones (nombre, valor)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE valor = VALUES(valor)
  `;

  await db.query(sql, [nombre, valor]);
};



const getTasaXnombre = (nombretasa,callback) => {
    const query ='SELECT * FROM rs_tasa WHERE  nombre_tasa = ?'
  db.query(query, [nombretasa], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};


/*
const getUsuariosXPSW = (passwordusu,callback) => {
    const query ='SELECT * FROM rs_usuario WHERE  psw_usu = ?'
  db.query(query, [passwordusu], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

*/




module.exports = {
  guardarTasa,
  getTasaXnombre
 /* getUsuariosXPSW*/
};

