console.log("Iniciando servidor...");

require('dotenv').config();
console.log("Variables cargadas:", {
  DB_HOST: process.env.DB_HOST,
  WISP_API_KEY: process.env.WISP_API_KEY ? "OK" : "NO DEFINIDA"
});


const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// importar rutas
const userRoutes = require('./routes/userRoutes');
const wisphubRoutes = require('./routes/wisphubRoutes');
const bdvRoutes = require('./routes/bdvRoutes');


app.get('/', (req, res) => {
  res.send('API  funcionando 🚀');
});

app.use('/api', userRoutes);
app.use('/api', wisphubRoutes);
app.use('/api', bdvRoutes);
//app.use('/api/wisp', wisphubRoutes);

//console.log(process.env.WISP_API_KEY);
app.use((err, req, res, next) => {
  console.error("Error global:", err);
  res.status(500).json({ error: "Error interno" });
});


//en la nube 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
/*
//local
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor en http://192.168.78.237:3000');
});*/

/*
Tu archivo cumple todo:

✔ dotenv cargado primero
✔ Logs de variables (útil para debug en Render)
✔ Middlewares antes de rutas
✔ Rutas bien montadas (/api)
✔ Middleware de errores en el lugar correcto
✔ PORT dinámico
✔ listen al final
*/