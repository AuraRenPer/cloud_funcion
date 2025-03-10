const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require("../middlewares/authMiddleware");
const {
  crearHistorial,
  obtenerHistorials,
  obtenerHistorialPorId,
  actualizarHistorial,
  eliminarHistorial,
  obtenerHistorialPorUsuario,
} = require("../controllers/historial");


router.post("/", verificarToken, crearHistorial);
router.get("/", verificarToken, obtenerHistorials);
router.get("/:id", verificarToken, obtenerHistorialPorId);
router.put("/:id", verificarToken, actualizarHistorial);
router.delete("/:id", verificarToken, eliminarHistorial);
router.get("/usuario/:idUsuario", verificarToken, obtenerHistorialPorUsuario);

module.exports = router;
