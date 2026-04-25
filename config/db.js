console.log("🔥 USANDO POOL DE MYSQL 🔥");
const mysql = require('mysql2');

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

console.log("🔥 DB CONFIG:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

module.exports = db;


/*
//localhost
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
*/

/*
db.query('SELECT DATABASE()', (err, result) => {
  console.log("BASE DE DATOS:", result);
});

db.query('SELECT * FROM rs_usuario', (err, result) => {
  console.log("TODOS LOS USUARIOS:", result);
});

module.exports = db;
*/