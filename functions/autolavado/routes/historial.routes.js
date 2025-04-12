const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearHistorial,
  obtenerHistorial,
  obtenerHistorialPorUsuario,
} = require("../controllers/historial");


router.post("/crearhistorial", crearHistorial);
router.get("/obtenerhistoriales", obtenerHistorial);
router.get("/obtenerhistorialusuario/:idUsuario", obtenerHistorialPorUsuario);

module.exports = router;
