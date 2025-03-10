const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require("../../autolavado/middlewares/authMiddleware");
const {
  crearHistorial,
  obtenerHistorials,
  obtenerHistorialPorId,
  actualizarHistorial,
  eliminarHistorial,
  obtenerHistorialPorUsuario,
} = require("../controllers/historial");


router.post("/crearhistorial", verificarToken, crearHistorial);
router.get("/obtenerhistoriales", verificarToken, obtenerHistorials);
router.get("/obtenerhistorial/:id", verificarToken, obtenerHistorialPorId);
router.put("/actualizarhistorial/:id", verificarToken, actualizarHistorial);
router.delete("/eliminarhistorial/:id", verificarToken, eliminarHistorial);
router.get(
    "/usuariohistorial/:idUsuario",
    verificarToken,
    obtenerHistorialPorUsuario,
);

module.exports = router;
