const Categoria = require("../models/categoria");

/**
 * Crea una nueva categoría.
 * @param {Request} req - Solicitud HTTP con los datos de la categoría.
 * @param {Response} res - Respuesta HTTP.
 */
exports.crearCategoria = async (req, res) => {
  try {
    const {nombre, descripcion, estatus} = req.body;
    const nuevaCategoria = new Categoria(nombre, descripcion, estatus);
    const idCategoria = await nuevaCategoria.save();

    res.status(201).json({id: idCategoria, ...req.body});
  } catch (error) {
    res.status(500).json({
      error: "Error al crear categoría",
      detalle: error.message,
    });
  }
};

/**
 * Obtiene todas las categorías activas.
 * @param {Request} req - Solicitud HTTP.
 * @param {Response} res - Respuesta HTTP.
 */
exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.getAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener categorías",
      detalle: error.message,
    });
  }
};

/**
 * Obtiene una categoría por su ID.
 * @param {Request} req - Solicitud HTTP con el ID de la categoría.
 * @param {Response} res - Respuesta HTTP.
 */
exports.obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Categoria.getById(req.params.id);
    if (!categoria) {
      return res.status(404).json({error: "Categoría no encontrada"});
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la categoría",
      detalle: error.message,
    });
  }
};
