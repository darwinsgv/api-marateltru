const db = require('../config/db');

const guardarTasa = (nombretasa, valortasa) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO rs_tasa (nombre_tasa, descripcion_tasa, valor_tasa)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        valor_tasa = VALUES(valor_tasa)
    `;

    db.query(sql, [nombretasa, "Dolar USA", valortasa], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

/*
const guardarTasa = async (nombretasa, valortasa) => {
  const sql = `
    INSERT INTO configuraciones (nombretasa, valortasa)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE valor = VALUES(valor)
  `;

  await db.query(sql, [nombretasa, valortasa]);
};*/



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

