const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios");

router.post("/crear", crearUsuario);
router.get("/:id", obtenerUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
