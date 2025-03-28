const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculoPorId,
  actualizarVehiculo,
  eliminarVehiculo,
} = require("../controllers/vehiculos");


router.post("/crearvehiculo", crearVehiculo);
router.get("/obtenervehiculos", obtenerVehiculos);
router.get("/obtenervehiculo/:id", obtenerVehiculoPorId);
router.put("/actualizarvehiculo/:id", actualizarVehiculo);
router.delete("/eliminarvehiculo/:id", eliminarVehiculo);

module.exports = router;
