const express = require("express");
const {verificarToken} = require("../middlewares/authMiddleware");
const {
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita,
} = require("../controllers/citas");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/", verificarToken, crearCita);
router.get("/", verificarToken, obtenerCitas);
router.get("/:id", verificarToken, obtenerCitaPorId);
router.put("/:id", verificarToken, actualizarCita);
router.delete("/:id", verificarToken, eliminarCita);

module.exports = router;
