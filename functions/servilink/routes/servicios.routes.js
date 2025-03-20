const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearServicio,
  obtenerServicios,
  obtenerServiciosPorProveedor,
  actualizarServicio,
  eliminarServicio,
} = require("../controllers/servicios");


router.post("/crearservicio", crearServicio);
router.get("/obtenerservicios", obtenerServicios);
router.get("/obtenerserviciosproveedor/:id", obtenerServiciosPorProveedor);
router.put("/actualizarservicio/:id", actualizarServicio);
router.delete("/eliminarservicio/:id", eliminarServicio);

module.exports = router;
