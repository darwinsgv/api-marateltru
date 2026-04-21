const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "mi_clave_secreta"; // luego usar .env

app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  // 1. Buscar usuario en MySQL
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE usuario_usu = ?",
    [usuario]
  );

  if (rows.length === 0) {
    return res.status(401).json({ message: "Usuario no existe" });
  }

  const user = rows[0];

  // 2. Comparar contraseña
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  // 3. Crear token
  const token = jwt.sign(
    { id: user.id, usuario: user.usuario_usu },
    SECRET_KEY,
    { expiresIn: "2h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      usuario: user.usuario_usu
    }
  });
});