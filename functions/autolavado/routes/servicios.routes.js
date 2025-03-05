const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require(
    "../middlewares/authMiddleware",
); // Importar middleware
const {
  crearServicio,
  obtenerServicio,
  obtenerServicios,
  actualizarServicio,
  eliminarServicio,
} = require("../controllers/servicios");

router.post("/crear", verificarToken, crearServicio);
router.get("/:id", verificarToken, obtenerServicio);
router.get("/", verificarToken, obtenerServicios);
router.put("/:id", verificarToken, actualizarServicio);
router.delete("/:id", verificarToken, eliminarServicio);

module.exports = router;
