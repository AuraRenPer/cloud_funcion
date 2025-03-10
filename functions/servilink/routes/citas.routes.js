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


router.post("/crearcita", verificarToken, crearCita);
router.get("/historialcitas", verificarToken, obtenerCitas);
router.get("/obtenercita/:id", verificarToken, obtenerCitaPorId);
router.put("/actualizarcita/:id", verificarToken, actualizarCita);
router.delete("/eliminarcita/:id", verificarToken, eliminarCita);
router.get("/usuariocitas/:idUsuario", verificarToken, obtenerCitasPorUsuario);


module.exports = router;
