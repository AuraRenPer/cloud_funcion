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

const usuariosRoutesServilink = require(
    "./servilink/routes/usuarios.routes",
);
const serviciosRoutesServilink = require(
    "./servilink/routes/servicios.routes",
);
const proveedoresRoutesServilink = require(
    "./servilink/routes/proveedores.routes",
);
const citasRoutesServilink = require(
    "./servilink/routes/citas.routes",
);

// Rutas de los módulos para proveedores
/* const historialRoutes = require("./servilink/routes/historialRoutes"); */
const gestionarServiciosRoutesServilink = require(
    "./servilink/routes/gestionarServiciosRoutes",
);
/* const mensajesRoutes = require("./servilink/routes/mensajesRoutes");
const solicitudesRoutes = require("./servilink/routes/solicitudesRoutes");
const perfilRoutes = require("./servilink/routes/perfilRoutes"); */

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/vehiculos", vehiculosRoutes);

app.use(
    "/api/usuarios_servilink",
    usuariosRoutesServilink,
);
app.use(
    "/api/servicios_servilink",
    serviciosRoutesServilink,
);
app.use(
    "/api/proveedores_servilink",
    proveedoresRoutesServilink,
);
app.use(
    "/api/citas_servilink",
    citasRoutesServilink,
);

// Rutas módulos para proveedores
// app.use("/api/historial", historialRoutes);
app.use(
    "/api/gestionar_servicios_servilink",
    gestionarServiciosRoutesServilink,
);
/* app.use("/api/mensajes", mensajesRoutes);
app.use("/api/solicitudes", solicitudesRoutes);
app.use("/api/perfil", perfilRoutes); */

exports.api = functions.https.onRequest(app);
