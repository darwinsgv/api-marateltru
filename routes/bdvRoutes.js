const express = require('express');
const router = express.Router();
const bancodevenezuelaController = require('../controllers/bancodevenezuelaController');

//router.get('/facturas/:cedula', wisphubController.getFacturaWispPorCedula);
router.get('/referencias/:referencia', bancodevenezuelaController.getReferenciaXNumero);

module.exports = router;

