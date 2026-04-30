const getReferenciaXNumero = async (req, res) => {
  const { referencia } = req.params;

  try {
    console.log("Consultando BDV con referencia:", referencia);

    const response = await axios.post(
      //'https://bdvconciliacionqa.banvenez.com:444/apis/bdv/consulta/movimientos/v2',
      //'https://bdvconciliacion.banvenez.com/getMovement',
      //http://200.11.243.176:444/getMovement,
      //'https://bdvconciliacion.banvenez.com/apis/bdv/consulta/',
       //https://bdvconciliacion.banvenez.com/apis/bdv/consulta/movimientos
      'https://bdvconciliacion.banvenez.com:443/apis/bdv/consulta/movimientos',
      {
        //cuenta: "01020501830003283374", //del  pdf
        cuenta: process.env.BDV_ACCOUNT,//de wilmer
        fechaIni: "01/04/2026",
        fechaFin: "31/04/2026",
        tipoMoneda: "VES",
        //nroMovimiento:  String(referencia).trim(),
        nroMovimiento: "",
        canal: "WEB"},
      {
        /*headers: {
         'Authorization': `X-API-Key ${process.env.BDV_API_KEY}`, // 👈 IMPORTANTE
         //'Authorization': `X-API-Key 256D0FDD36F1B1B3F1208A9B6EC693`, //  QA (sandbox)
          'Content-Type': 'application/json'
        }*/

        headers: {
           'X-API-Key': process.env.BDV_API_KEY,
            'Content-Type': 'application/json'
           }
      }
    );


    console.log("Respuesta BDV:", response.data);

    return res.json(response.data);

  } catch (error) {
    console.error("ERROR COMPLETO BDV:", error.response?.data || error.message);
    //console.error("ERROR COMPLETO:",     error.response?.data);
    return res.status(500).json({
      error: "Error al consultar BDV",
      detalle: error.response?.data || error.message
    });
  }
};



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

const getReferenciaXNumeroConciliacion = async (req, res) => {
  const { referencia } = req.params;

  try {
    console.log("Consultando BDV con referencia:", referencia);

    const response = await axios.post(
      'https://bdvconciliacionqa.banvenez.com:444/apis/bdv/consulta/movimientos/v2',
    //'https://bdvconciliacion.banvenez.com/getMovement',
      {
        cedulaPagador: "V020497239",
        telefonoPagador: "04246920139",
        telefonoDestino: "04246920139",
        referencia: referencia,
        fechaPago: "2026-04-23",
        importe: "12083.45",
        bancoOrigen: "0102"
      },
      {
        /*headers: {
          'Authorization': `X-API-Key ${process.env.BDV_API_KEY}`, // 👈 IMPORTANTE
          'Content-Type': 'application/json'
        }*/
        headers: {
           'X-API-Key': process.env.BDV_API_KEY,
            'Content-Type': 'application/json'
           }
      }
    );


    console.log("Respuesta BDV:", response.data);

    return res.json(response.data);

  } catch (error) {
    console.error("ERROR COMPLETO BDV:", error.response?.data || error.message);
    //console.error("ERROR COMPLETO:",     error.response?.data);
    return res.status(500).json({
      error: "Error al consultar BDV",
      detalle: error.response?.data || error.message
    });
  }
};

/*
const getReferenciaXNumero = async (req, res) => {
  const { referencia } = req.params;

  try {
    console.log("Consultando BDV con referencia:", referencia);

    const response = await axios.post(
      'https://bdvconciliacion.banvenez.com/getMovement',
      {
        cedulaPagador: "V020497239",
        telefonoPagador: "04246920139",
        telefonoDestino: "04246920139",
        referencia: referencia,
        fechaPago: "2026-04-23",
        importe: "12083.45",
        bancoOrigen: "0102"
      },
      {
        /*headers: {
          'Authorization': `X-API-Key ${process.env.BDV_API_KEY}`, // 👈 IMPORTANTE
          'Content-Type': 'application/json'
        }*/
 /*       headers: {
           'X-API-Key': process.env.BDV_API_KEY,
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
*/
module.exports = { 
  getReferenciaXNumero ,
  getReferenciaXNumeroConciliacion
};