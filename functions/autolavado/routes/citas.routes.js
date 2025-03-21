const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearCita,
  obtenerCitas,
  obtenerCitasPorUsuario,
  obtenerCitasPorProveedor,
} = require("../controllers/citas");


router.post("/crearcita", crearCita);
router.get("/obtenercitas", obtenerCitas);
router.get("/obtenercitausuario/:id", obtenerCitasPorUsuario);
router.get("/obtenercitaproveedor/:id", obtenerCitasPorProveedor);

module.exports = router;
