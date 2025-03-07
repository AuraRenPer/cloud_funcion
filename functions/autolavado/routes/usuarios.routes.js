const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require("../middlewares/authMiddleware");
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios");


router.post("/", verificarToken, crearUsuario);
router.get("/", verificarToken, obtenerUsuarios);
router.get("/:id", verificarToken, obtenerUsuarioPorId);
router.put("/:id", verificarToken, actualizarUsuario);
router.delete("/:id", verificarToken, eliminarUsuario);

module.exports = router;
