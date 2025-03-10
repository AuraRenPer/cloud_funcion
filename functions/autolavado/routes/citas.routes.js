const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require("../middlewares/authMiddleware");
const {
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita,
  obtenerCitasPorUsuario,
} = require("../controllers/citas");


router.post("/", verificarToken, crearCita);
router.get("/", verificarToken, obtenerCitas);
router.get("/:id", verificarToken, obtenerCitaPorId);
router.put("/:id", verificarToken, actualizarCita);
router.delete("/:id", verificarToken, eliminarCita);
router.get("/usuario/:idUsuario", verificarToken, obtenerCitasPorUsuario);


module.exports = router;
