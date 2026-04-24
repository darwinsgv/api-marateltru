const db = require('../config/db');

const getUsuarios = (callback) => {
  db.query('SELECT * FROM rs_usuario', callback);
};


const getUsuariosXPSW = (passwordusu,callback) => {
    const query ='SELECT * FROM rs_usuario WHERE  psw_usu = ?'
  db.query(query, [passwordusu], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};


const getUsuariosXCI = (usuarioci,callback) => {
    const query ='SELECT * FROM rs_usuario WHERE  id_usu = ?'
  db.query(query, [usuarioci], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};


const loginUser = (usuario, password, callback) => {
  const query = 'SELECT * FROM rs_usuario WHERE  LOWER(usuario_usu) = LOWER(?)  AND psw_usu = ?';
  db.query(query, [usuario, password], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });};

// 👉 NUEVO: buscar usuario
const buscarUsuario = (usuario, callback) => {
  const query = `
    SELECT * 
    FROM rs_usuario 
    WHERE LOWER(usuario_usu) = LOWER(?)
  `;

  db.query(query, [usuario], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// 👉 NUEVO: registrar usuario
const registrarElUsuario = (usuario, password, callback) => {
  const query = `
    INSERT INTO rs_usuario (usuario_usu, psw_usu)
    VALUES (?, ?)
  `;

  db.query(query, [usuario, password], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  getUsuariosXCI,
  getUsuarios,
  loginUser,
  buscarUsuario,
  registrarElUsuario
};

