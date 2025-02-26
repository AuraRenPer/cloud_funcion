const functions = require("firebase-functions");
const cors = require("cors");
const corsHandler = cors({origin: true});

const admin = require("firebase-admin");

const servicios = require("./servicios");
const clientes = require("./clientes");

// Inicializar Firebase Admin solo si no está inicializado
if (admin.apps.length === 0) {
  admin.initializeApp();
}

// ✅ Wrappers con CORS para cada función de Servicios
exports.crearServicio = functions.https.onRequest((req, res) =>
  corsHandler(req, res, () => servicios.crearServicio(req, res)),
);
exports.obtenerServicios = functions.https.onRequest((req, res) =>
  corsHandler(req, res, () => servicios.obtenerServicios(req, res)),
);
exports.actualizarServicio = functions.https.onRequest((req, res) =>
  corsHandler(req, res, () => servicios.actualizarServicio(req, res)),
);
exports.eliminarServicio = functions.https.onRequest((req, res) =>
  corsHandler(req, res, () => servicios.eliminarServicio(req, res)),
);

// ✅ Wrappers con CORS para cada función de Clientes
exports.registrarCliente = functions.https.onRequest((req, res) =>
  corsHandler(req, res, () => clientes.registrarCliente(req, res)),
);
exports.obtenerClientes = functions.https.onRequest((req, res) =>
  corsHandler(req, res, () => clientes.obtenerClientes(req, res)),
);
exports.actualizarCliente = functions.https.onRequest((req, res) =>
  corsHandler(req, res, () => clientes.actualizarCliente(req, res)),
);
exports.eliminarCliente = functions.https.onRequest((req, res) =>
  corsHandler(req, res, () => clientes.eliminarCliente(req, res)),
);
