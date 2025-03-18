const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearHistorial,
  obtenerHistorial,
  obtenerHistorialPorUsuario,
} = require("../controllers/historial");

router.post("/crearhistorial", crearHistorial);
router.get("/obtenerhistorial", obtenerHistorial);
router.get("/obtenerhistorial/:idUsuario", obtenerHistorialPorUsuario);

module.exports = router;
