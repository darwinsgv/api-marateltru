//const userModel = require('../models/userModel');
const userModel = require('../models/configuracionesModel');

const registrarTasaXnombre = async (req, res) => {
  try {
    const tasas = req.body;

    if (!Array.isArray(tasas)) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe enviar un array de tasas"
      });
    }

    for (const tasa of tasas) {
      const { nombretasa, valortasa } = tasa;

      if (!nombretasa || valortasa === undefined) {
        return res.status(400).json({
          ok: false,
          mensaje: "Datos incompletos"
        });
      }

      await userModel.guardarTasa(nombretasa, valortasa);
    }

    return res.json({
      ok: true,
      mensaje: "Tasas guardadas correctamente"
    });

  } catch (error) {
    console.error("Error en registrarTasaXnombre:", error);

    return res.status(500).json({
      ok: false,
      mensaje: "Error del servidor",
      error: error.message
    });
  }
};//fin registrarTasaXnombre

const getTasaXnombre = (req, res) => {
  const { nmdtasa } = req.params; // 👈 CLAVE

  console.log("nmdtasa recibido:", nmdtasa);

  userModel.getTasaXnombre(nmdtasa, (err, results) => {
    if (err) {
  console.error("💥 ERROR MYSQL:", err);
  return res.status(500).json({
        success: false,
        message: "Error del servidor",
        error: err.message
  });//fin res.status
}//fin if(err)

// ❌ Registro no encontrado/Tasa no encontrada
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tasa no encontrada"
      });
    }//fin if(results.length === 0)


 // ✅ Tasa sí encontrada
    return res.json({
      success: true,
      data: results[0]
    });//fin res.jason
  });//fin userModel.getTasaXnombre
};//fin getTasaXnombre() 



/*
const getUsuariosXpsw = (req, res) => {
  const { psw } = req.params; // 👈 CLAVE

  console.log("PSW recibido:", psw);

  userModel.getUsuariosXPSW(psw, (err, results) => {
    if (err) {
  console.error("💥 ERROR MYSQL:", err);
  return res.status(500).json({
        success: false,
        message: "Error del servidor",
        error: err.message
  });
}

// ❌ Usuario no encontrado
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }


 // ✅ Usuario encontrado
    return res.json({
      success: true,
      data: results[0]
    });
  });
};

*/




module.exports = {
  getTasaXnombre,
  /*getUsuariosXpsw,*/
  registrarTasaXnombre
};