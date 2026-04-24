const userModel = require('../models/userModel');

const getUsuariosXpsw= (req, res) => {
  console.log("5 req.body: ",req.body); // 👈 agrega esto
  userModel.getUsuariosXPSW((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
};//getUsuariosXpsw


const getUsuarios = (req, res) => {
  userModel.getUsuarios((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
};


const getUsuariosXCi = (req, res) => {
  console.log("13 req.body: ",req.body); // 👈 agrega esto
  userModel.getUsuariosXCI((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
};//getUsuariosXCi

const loginUserXCI = (req, res) => {
console.log("23 req.body: ",req.body); // 👈 agrega esto
const { usuarioci } = req.body;
const id = Number(usuarioci);

console.log("ID recibido:", id);

if (!id || isNaN(id)) {
  return res.status(400).json({
    success: false,
    message: 'ID inválido'
  });
}

  userModel.getUsuariosXCI(usuarioci, (err, results) => {
    console.log("37 RESULTS:", results); // 👈 agrega esto
    console.log("38 Err:", err);
    if (err) {
      console.log("41 Entró: ", res.status(500).json(err));
      return res.status(500).json(err);
    }

    if (results.length > 0) {
      console.log("45 results[0] ", results[0]);
      res.json({
        success: true,
        user: results[0]
      });
    } else {
      console.log("51 Credenciales incorrectas");
      res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }
  });
};//fin de loginUserXCI



const loginUser = (req, res) => {
  console.log(req.body); // 👈 agrega esto

  const { usuario, password } = req.body;

  userModel.loginUser(usuario, password, (err, results) => {
    console.log("RESULTS:", results); // 👈 agrega esto
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length > 0) {
      res.json({
        success: true,
        user: results[0]
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }
  });
};


// 👉 NUEVO
const registrarUsuario = (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      success: false,
      message: 'Datos incompletos'
    });
  }

  // 1. verificar si existe
  userModel.buscarUsuario(usuario, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // 2. crear usuariox
    userModel.registrarElUsuario(usuario, password, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: 'Usuario registrado correctamente'
      });
    });
  });
};


module.exports = {
  getUsuariosXCi,
  getUsuarios,
  getUsuariosXpsw,
  loginUserXCI ,
  loginUser,
  registrarUsuario
};