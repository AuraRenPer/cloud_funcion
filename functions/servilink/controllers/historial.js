const Historial = require("../models/historial");

// Crear historial
exports.crearHistorial = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    const {
      idCita,
      idUsuario,
      idProveedor,
      idServicio,
      fechaServicio,
      estatus,
    } = req.body;

    if (
      !idCita ||
      !idUsuario ||
      !idProveedor ||
      !idServicio ||

      !fechaServicio ||
      !estatus) {
      return res.status(400).json({
        error: "Todos los campos obligatorios deben ser completados.",
      });
    }

    const nuevoHistorial = new Historial(

        null,
        idUsuario,
        idProveedor,
        idServicio,
        fechaServicio,
        estatus,
    );
    const historialId = await nuevoHistorial.save();

    res.status(201).json({
      id: historialId,
      mensaje: "Historial registrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el historial",
      detalle: error.message,
    });
  }
};

// Obtiene el historial de un usuario.
exports.obtenerHistorialPorUsuario = async (req, res) => {
  try {
    const {idUsuario} = req.params;
    if (!idUsuario) {
      return res.status(400).json({
        error: "ID de usuario requerido",
      });
    }

    const historial = await Historial.getByUsuario(idUsuario);
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el historial",
      detalle: error.message,
    });
  }
};

// Obtiene un historial específico por ID.

exports.obtenerHistorialPorId = async (req, res) => {
  try {
    const {idHistorial} = req.params;
    if (!idHistorial) {
      return res.status(400).json({
        error: "ID de historial requerido",
      });
    }

    const historial = await Historial.getById(idHistorial);
    if (!historial) {
      return res.status(404).json({
        error: "Historial no encontrado",
      });
    }

    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el historial",
      detalle: error.message,
    });
  }
};
