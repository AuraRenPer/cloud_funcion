const Servicio = require("../models/servicio");

// Crear un nuevo servicio
exports.crearServicio = async (req, res) => {
  try {
    const nuevoServicio = await Servicio.create(req.body);
    res.status(201).json({
      mensaje: "Servicio creado exitosamente",
      servicio: nuevoServicio,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el servicio",
      detalle: error.message,
    });
  }
};

// Obtener un servicio por ID
exports.obtenerServicio = async (req, res) => {
  try {
    const servicio = await Servicio.getById(req.params.id);
    if (!servicio) {
      return res.status(404).json({error: "Servicio no encontrado"});
    }
    res.status(200).json(servicio);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el servicio",
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

// Actualizar un servicio
exports.actualizarServicio = async (req, res) => {
  try {
    const servicioActualizado = await Servicio.update(req.params.id, req.body);
    res.status(200).json({
      mensaje: "Servicio actualizado correctamente",
      servicio: servicioActualizado,
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
    await Servicio.delete(req.params.id);
    res.status(200).json({mensaje: "Servicio eliminado correctamente"});
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el servicio",
      detalle: error.message,
    });
  }
};
