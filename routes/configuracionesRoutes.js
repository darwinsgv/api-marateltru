const express = require('express');
const router = express.Router();
const configuracionesController = require('../controllers/configuracionesController');

//router.get('/usuarios/psw/:psw', userController.getUsuariosXpsw);
router.get('/configuraciones/:nmdtasa', configuracionesController.getTasaXnombre);
router.put('/configuraciones/bulk', configuracionesController.registrarTasaXnombre);

module.exports = router;

