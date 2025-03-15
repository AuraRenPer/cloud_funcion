const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearCita,
  obtenerCitas,
  obtenerCitasPorUsuario,
  obtenerFechasOcupadas,
} = require("../controllers/citas");


router.post("/crearcita", crearCita);
router.get("/historialcitas", obtenerCitas);
router.get("/obtenercita/:id", obtenerCitaPorId);
router.put("/actualizarcita/:id", actualizarCita);
router.delete("/eliminarcita/:id", eliminarCita);
router.get("/usuariocitas/:idUsuario", obtenerCitasPorUsuario);
router.get("/fechasocupadas", obtenerFechasOcupadas);

module.exports = router;
