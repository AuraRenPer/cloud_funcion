const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const usuariosRoutes = require("./autolavado/routes/usuarios.routes");
const serviciosRoutes = require("./autolavado/routes/servicios.routes");
const proveedoresRoutes = require("./autolavado/routes/proveedores.routes");
const citasRoutes = require("./autolavado/routes/citas.routes");
const vehiculosRoutes = require("./autolavado/routes/vehiculos.routes");

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/vehiculos", vehiculosRoutes);

exports.api = functions.https.onRequest(app);
