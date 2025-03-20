const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const usuariosRoutes = require("./autolavado/routes/usuarios.routes");
const serviciosRoutes = require("./autolavado/routes/servicios.routes");
const proveedoresRoutes = require("./autolavado/routes/proveedores.routes");
const citasRoutes = require("./autolavado/routes/citas.routes");
const vehiculosRoutes = require("./autolavado/routes/vehiculos.routes");

const usuariosRoutesServilink = require("./servilink/routes/usuarios.routes");
const serviciosRoutesServilink = require("./servilink/routes/servicios.routes");
const proveedoresRoutesServilink = require(
    "./servilink/routes/proveedores.routes",
);
const citasRoutesServilink = require("./servilink/routes/citas.routes");
const historialRoutes = require("./servilink/routes/historial.routes");
const categoriasRoutes = require("./servilink/routes/categorias.routes");


app.use("/api/usuarios", usuariosRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/vehiculos", vehiculosRoutes);

app.use("/api/usuarios_servilink", usuariosRoutesServilink);
app.use("/api/servicios_servilink", serviciosRoutesServilink);
app.use("/api/proveedores_servilink", proveedoresRoutesServilink);
app.use("/api/citas_servilink", citasRoutesServilink);
app.use("/api/historial_servilink", historialRoutes);
app.use("/api/categorias_servilink", categoriasRoutes);

exports.api = functions.https.onRequest(app);


