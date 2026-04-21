/*const express = require('express');
const router = express.Router();
const wisphubController = require('../controllers/wisphubController');

router.get('/clientes-wisp', wisphubController.getClienteWispPorCedula);

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const wisphubController = require('../controllers/wisphubController');
router.get('/clientes/:cedula', wisphubController.getClienteWispPorCedula);
router.get('/facturas/:cedula', wisphubController.getFacturaWispPorCedula);
router.get('/facturasxnombre/:nombrecompleto', wisphubController.getFacturaWispPorNombreCompleto);

module.exports = router;

//NO BORRAR ESTA PERFECTO 20-04-2026, sirve sin controllers
/* 
const API_URL_WISPHUB = 'https://api.wisphub.net/api';
router.get('/clientes/:cedula', async (req, res) => {
  try {
    const { cedula } = req.params;

    const response = await fetch(`${API_URL_WISPHUB}/clientes/`, {
      headers: {
        Authorization: `Api-Key ${process.env.WISP_API_KEY}`
      }
    });

    const data = await response.json();

    const cliente = data.results.find(c => c.cedula == cedula);

    if (!cliente) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(cliente);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;*/