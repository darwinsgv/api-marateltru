const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//const wisphubController = require('../controllers/wisphubController');

/*
router.get('/usuarios', userController.getUsuarios);
router.post('/login', userController.loginUser);
router.post('/registrodeusuario', userController.registrarUsuario);
*/
router.get('/usuarios/psw/:psw', userController.getUsuariosXpsw);
router.get('/contratos', userController.getUsuarios);
router.post('/login', userController.loginUserXCI);
router.post('/registrodeusuario', userController.registrarUsuario);




//router.get('/usuarios', userController.getUsuariosXCi);
router.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;

  console.log("ID recibido:", id);
//const db = require('../cdb'); // 👈 o la ruta correcta
const db = require('../config/db');

  db.query(
    'SELECT * FROM rs_usuario WHERE id_usu = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      if (results.length === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      res.json(results[0]); // 👈 un solo usuario
    }
  );
});


module.exports = router;

