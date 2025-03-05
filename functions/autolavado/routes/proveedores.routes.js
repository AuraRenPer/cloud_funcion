const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require("../middlewares/authMiddleware");
const {
  crearProveedor,
  obtenerProveedor,
  obtenerProveedores,
  actualizarProveedor,
  eliminarProveedor,
} = require("../controllers/proveedores");

router.post("/crear", verificarToken, crearProveedor);
router.get("/:id", verificarToken, obtenerProveedor);
router.get("/", verificarToken, obtenerProveedores);
router.put("/:id", verificarToken, actualizarProveedor);
router.delete("/:id", verificarToken, eliminarProveedor);

module.exports = router;
