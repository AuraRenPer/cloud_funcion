const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
<<<<<<< HEAD
const {
  crearHistorial,
  obtenerHistorial,
  obtenerHistorialPorUsuario,
} = require("../controllers/historial");

router.post("/crearhistorial", crearHistorial);
router.get("/obtenerhistorial", obtenerHistorial);
router.get("/obtenerhistorial/:idUsuario", obtenerHistorialPorUsuario);
=======
const historialController = require("../controllers/historial");

router.post("/historial", historialController.crearHistorial);
router.get("/historial/usuario/:idUsuario",
    historialController.obtenerHistorialPorUsuario,
);
router.get("/historial/:idHistorial",
    historialController.obtenerHistorialPorId,
);
>>>>>>> e9a82e4b (historial fixed)

module.exports = router;
