const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
} = require("../controllers/categorias");

router.post("/crearcategoria", crearCategoria);
router.get("/obtenercategorias", obtenerCategorias);
router.get("/:id", obtenerCategoriaPorId);

module.exports = router;
