const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearSolicitudController,
  obtenerSolicitudesController,
  obtenerSolicitudesPorUsuarioController,
  obtenerSolicitudesPorProveedorController,
  actualizarEstadoSolicitudController,
  obtenerSolicitudesPopuladasPorProveedor,
} = require("../controllers/solicitudes");

router.post("/crearsolicitud", crearSolicitudController);
router.get("/obtenersolicitudes", obtenerSolicitudesController);
router.get("/obtenerporusuario/:idUsuario",
    obtenerSolicitudesPorUsuarioController);
router.get("/obtenerporproveedor/:idProveedor",
    obtenerSolicitudesPorProveedorController);
router.patch("/actualizarsolicitud/:idSolicitud",
    actualizarEstadoSolicitudController);
router.get("/obtenerpopuladaporproveedor/:idProveedor",
    obtenerSolicitudesPopuladasPorProveedor);

module.exports = router;
