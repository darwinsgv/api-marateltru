/*const getReferenciaXNumero = async (req, res) => {
  const { referencia } = req.params;

  try {
    //let url = 'http://200.11.243.176:444/getMovement/?limit=100';//test
      let url = 'https://bdvconciliacion.banvenez.com:443/getMovement/?limit=100';//Produccions

    while (url) {
      const response = await axios.get(url, {
        headers: {
          //Authorization: `X-API-Key ${process.env.BDV_API_KEY}`
          //'Authorization': `X-API-Key ${process.env.BDV_API_KEY}`, // 👈 IMPORTANTE
          'X-API-Key': process.env.BDV_API_KEY
        }
      });

      const data = response.data;

      const myreferencia = data.results.find(refe => refe.referencia == referencia);

      if (myreferencia) {
        return res.json(myreferencia);
      }

      url = data.next;
    }

    return res.status(404).json({ message: 'Referencia no encontrada' });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: 'Error al buscar Referencia'
    });
  }
};
*/
const axios = require('axios');

const getReferenciaXNumero = async (req, res) => {
  const { referencia } = req.params;

  try {
    console.log("Consultando BDV con referencia:", referencia);

    const response = await axios.post(
      'https://bdvconciliacion.banvenez.com/getMovement',
      {
        cedulaPagador: "V19643403",
        telefonoPagador: "04246920139",
        telefonoDestino: "04246920139",
        referencia: referencia,
        fechaPago: "2026-04-17",
        importe: "1002998.41",
        bancoOrigen: "0102"
      },
      {
        headers: {
          'Authorization': `X-API-Key ${process.env.BDV_API_KEY}`, // 👈 IMPORTANTE
          'Content-Type': 'application/json'
        }
      }
    );


    console.log("Respuesta BDV:", response.data);

    return res.json(response.data);

  } catch (error) {
    console.error("ERROR BDV:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Error al consultar BDV",
      detalle: error.response?.data || error.message
    });
  }
};

module.exports = { getReferenciaXNumero };