const admin = require("firebase-admin");

// Inicializar Firebase Admin si no está inicializado
if (!admin.apps.length) {
  admin.initializeApp();
}

exports.verificarToken = async (req, res, next) => {
  const token = req.headers.authorization ?
    req.headers.authorization.split("Bearer ")[1]: null;

  if (!token) {
    return res.status(401).json(
        {error: "No se proporcionó un token de autenticación"},
    );
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Almacenar los datos del usuario en la solicitud
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    res.status(403).json(
        {error: "Token inválido o expirado", detalle: error.message},
    );
  }
};
