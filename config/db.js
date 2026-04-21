const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'abakosgamedb'
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('MySQL conectado ✅');
  }
});
/*
db.query('SELECT DATABASE()', (err, result) => {
  console.log("BASE DE DATOS:", result);
});

db.query('SELECT * FROM rs_usuario', (err, result) => {
  console.log("TODOS LOS USUARIOS:", result);
});
*/
module.exports = db;
