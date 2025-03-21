const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearHistorial,
  obtenerHistoriales,
  obtenerHistorialPorUsuario,
} = require("../controllers/historial");


router.post("/crearhistorial", crearHistorial);
router.get("/obtenerhistoriales", obtenerHistoriales);
router.get("/obtenerhistorialusuario/:idUsuario", obtenerHistorialPorUsuario);

module.exports = router;
