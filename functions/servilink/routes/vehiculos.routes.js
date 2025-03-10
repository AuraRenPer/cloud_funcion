const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require("../middlewares/authMiddleware");
const {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculoPorId,
  actualizarVehiculo,
  eliminarVehiculo,
} = require("../controllers/vehiculos");


router.post("/", verificarToken, crearVehiculo);
router.get("/", verificarToken, obtenerVehiculos);
router.get("/:id", verificarToken, obtenerVehiculoPorId);
router.put("/:id", verificarToken, actualizarVehiculo);
router.delete("/:id", verificarToken, eliminarVehiculo);

module.exports = router;
