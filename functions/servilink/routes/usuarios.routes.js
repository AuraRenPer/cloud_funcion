const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {verificarToken} = require("../../autolavado/middlewares/authMiddleware");
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario,
} = require("../controllers/usuarios");


router.post("/", crearUsuario);
router.get("/", verificarToken, obtenerUsuarios);
router.get("/:id", verificarToken, obtenerUsuarioPorId);
router.put("/:id", verificarToken, actualizarUsuario);
router.delete("/:id", verificarToken, eliminarUsuario);
router.post("/login", loginUsuario);
module.exports = router;
