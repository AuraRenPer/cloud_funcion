const Historial = require("../models/historial");

// Crear un nuevo historial
exports.crearHistorial = async (req, res) => {
  try {
    const {
      idCita,
      idUsuario,
      idProveedor,
      idServicio,
      fechaRealizacion,
      estatus,
    } = req.body;

    if (
      !idCita ||
      !idUsuario ||
      !idProveedor ||
      !idServicio ||
      !fechaRealizacion
    ) {
      return res.status(400).json({
        error: "Todos los campos obligatorios deben ser completados.",
      });
    }

    const nuevoHistorial = new Historial(
        idCita,
        idUsuario,
        idProveedor,
        idServicio,
        fechaRealizacion,
        estatus || "Completada", // Si no se envía, por defecto será Completada
    );

    const historialId = await nuevoHistorial.save();

    res.status(201).json({
      idHistorial: historialId,
      mensaje: "Historial registrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar el historial",
      detalle: error.message,
    });
  }
};

// Obtener todos los historiales
exports.obtenerHistoriales = async (req, res) => {
  try {
    const historiales = await Historial.getAll();
    res.status(200).json(historiales);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los historiales",
      detalle: error.message,
    });
  }
};

// Obtener historiales de un usuario
exports.obtenerHistorialPorUsuario = async (req, res) => {
  try {
    const {idUsuario} = req.params;
    const historiales = await Historial.getByUsuario(idUsuario);
    res.status(200).json(historiales);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los historiales del usuario",
      detalle: error.message,
    });
  }
};
