const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require("../middlewares/authMiddleware");
const {
  crearServicio,
  obtenerServicios,
  obtenerServicioPorId,
  actualizarServicio,
  eliminarServicio,
} = require("../controllers/servicios");

router.post("/", verificarToken, crearServicio);
router.get("/", verificarToken, obtenerServicios);
router.get("/:id", verificarToken, obtenerServicioPorId);
router.put("/:id", verificarToken, actualizarServicio);
router.delete("/:id", verificarToken, eliminarServicio);

module.exports = router;
