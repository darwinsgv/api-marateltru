const getReferenciaXNumero = async (req, res) => {
  const { referencia } = req.params;

  try {
    //let url = 'http://200.11.243.176:444/getMovement/?limit=100';//test
      let url = 'https://bdvconciliacion.banvenez.com:443/getMovement/?limit=100';//Produccions

    while (url) {
      const response = await axios.get(url, {
        headers: {
          //Authorization: `X-API-Key ${process.env.BDV_API_KEY}`
          Authorization: `Api-Key ${process.env.BDV_API_KEY}`
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

