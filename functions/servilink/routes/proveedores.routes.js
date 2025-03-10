const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require("../../autolavado/middlewares/authMiddleware");
const {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor,
} = require("../controllers/proveedores");


router.post("/crearproveedor", verificarToken, crearProveedor);
router.get("/obtenerproveedores", verificarToken, obtenerProveedores);
router.get("/obtenerproveedor/:id", verificarToken, obtenerProveedorPorId);
router.put("/actualizarproveedor/:id", verificarToken, actualizarProveedor);
router.delete("/eliminarproveedor/:id", verificarToken, eliminarProveedor);

module.exports = router;
