const Servicio = require("../models/servicio");

// Crear un nuevo servicio
exports.crearServicio = async (req, res) => {
  try {
    const {
      nombreServicio,
      descripcion,
      precio,
      duracionEstimada,
      idProveedor,
    } = req.body;

    if (
      !nombreServicio ||
      !descripcion ||
      !precio ||
      !duracionEstimada ||
      !idProveedor
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    const nuevoServicio = new Servicio(
        nombreServicio,
        descripcion,
        precio,
        duracionEstimada,
        idProveedor,
    );
    const servicioId = await nuevoServicio.save();

    res.status(201).json({
      id: servicioId,
      mensaje: "Servicio registrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar el servicio",
      detalle: error.message,
    });
  }
};

// Obtener todos los servicios
exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.getAll();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los servicios",
      detalle: error.message,
    });
  }
};

// Obtener un servicio por ID
exports.obtenerServicioPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const servicio = await Servicio.getById(id);
    res.status(200).json(servicio);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el servicio",
      detalle: error.message,
    });
  }
};

// Actualizar un servicio
exports.actualizarServicio = async (req, res) => {
  try {
    const {id} = req.params;
    const datosActualizados = req.body;
    await Servicio.updateById(id, datosActualizados);
    res.status(200).json({
      mensaje: "Servicio actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el servicio",
      detalle: error.message,
    });
  }
};

// Eliminar un servicio
exports.eliminarServicio = async (req, res) => {
  try {
    const {id} = req.params;
    await Servicio.deleteById(id);
    res.status(200).json({
      mensaje: "Servicio eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el servicio",
      detalle: error.message,
    });
  }
};
