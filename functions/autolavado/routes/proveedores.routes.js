const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor,
} = require("../controllers/proveedores");


router.post("/crearproveedor", crearProveedor);
router.get("/obtenerproveedores", obtenerProveedores);
router.get("/obtenerproveedor/:id", obtenerProveedorPorId);
router.put("/actualizarproveedor/:id", actualizarProveedor);
router.delete("/eliminarproveedor/:id", eliminarProveedor);

module.exports = router;
