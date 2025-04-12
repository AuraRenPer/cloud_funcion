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
const historialRoutes = require("./autolavado/routes/historial.routes");
const solicitudesRoutes = require(
    "./autolavado/routes/solicitudes.routes");

const usuariosRoutesServilink = require("./servilink/routes/usuarios.routes");
const serviciosRoutesServilink = require("./servilink/routes/servicios.routes");
const proveedoresRoutesServilink = require(
    "./servilink/routes/proveedores.routes",
);
const citasRoutesServilink = require("./servilink/routes/citas.routes");
const historialRoutesServilink = require("./servilink/routes/historial.routes");
const categoriasRoutesServilink = require(
    "./servilink/routes/categorias.routes");
const solicitudesRoutesServilink = require(
    "./servilink/routes/solicitudes.routes");

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/vehiculos", vehiculosRoutes);
app.use("/api/historial", historialRoutes);
app.use("/api/solicitudes", solicitudesRoutes);

app.use("/api/usuarios_servilink", usuariosRoutesServilink);
app.use("/api/servicios_servilink", serviciosRoutesServilink);
app.use("/api/proveedores_servilink", proveedoresRoutesServilink);
app.use("/api/citas_servilink", citasRoutesServilink);
app.use("/api/historial_servilink", historialRoutesServilink);
app.use("/api/categorias_servilink", categoriasRoutesServilink);
app.use("/api/solicitudes_servilink", solicitudesRoutesServilink);

exports.api = functions.https.onRequest(app);


