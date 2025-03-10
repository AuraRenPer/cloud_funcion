const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require("../middlewares/authMiddleware");
const {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor,
} = require("../controllers/proveedores");


router.post("/", verificarToken, crearProveedor);
router.get("/", verificarToken, obtenerProveedores);
router.get("/:id", verificarToken, obtenerProveedorPorId);
router.put("/:id", verificarToken, actualizarProveedor);
router.delete("/:id", verificarToken, eliminarProveedor);

module.exports = router;
