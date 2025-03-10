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

router.post("/crearservicio", verificarToken, crearServicio);
router.get("/obtenerservicios", verificarToken, obtenerServicios);
router.get("/obtenerservicio/:id", verificarToken, obtenerServicioPorId);
router.put("/editarservicio/:id", verificarToken, actualizarServicio);
router.delete("/eliminarservicio/:id", verificarToken, eliminarServicio);

module.exports = router;
