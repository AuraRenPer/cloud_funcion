const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const usuariosRoutes = require("./autolavado/routes/usuarios.routes");
const serviciosRoutes = require("./autolavado/routes/servicios.routes");

app.use("/usuarios", usuariosRoutes);
app.use("/servicios", serviciosRoutes);

exports.api = functions.https.onRequest(app);
