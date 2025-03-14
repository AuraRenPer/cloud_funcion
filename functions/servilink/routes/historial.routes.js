const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const historialController = require("../controllers/historial");

router.post("/historial", historialController.crearHistorial);
router.get("/historial/usuario/:idUsuario",
    historialController.obtenerHistorialPorUsuario,
);
router.get("/historial/:idHistorial",
    historialController.obtenerHistorialPorId,
);

module.exports = router;
