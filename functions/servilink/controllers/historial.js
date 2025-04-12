const Historial = require("../models/historial");

<<<<<<< HEAD
// Crear un nuevo historial
=======
// Crear historial
>>>>>>> e9a82e4b (historial fixed)
exports.crearHistorial = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    const {
      idCita,
      idUsuario,
      idProveedor,
      idServicio,
<<<<<<< HEAD
      fechaRealizacion,
=======
      fechaServicio,
>>>>>>> e9a82e4b (historial fixed)
      estatus,
    } = req.body;

    if (
      !idCita ||
      !idUsuario ||
      !idProveedor ||
      !idServicio ||
<<<<<<< HEAD
      !fechaRealizacion
    ) {
=======
      !fechaServicio ||
      !estatus) {
>>>>>>> e9a82e4b (historial fixed)
      return res.status(400).json({
        error: "Todos los campos obligatorios deben ser completados.",
      });
    }

    const nuevoHistorial = new Historial(
<<<<<<< HEAD
        idCita,
        idUsuario,
        idProveedor,
        idServicio,
        fechaRealizacion,
        estatus || "Completada", // Si no se envía, por defecto será Completada
=======
        null,
        idUsuario,
        idProveedor,
        idServicio,
        fechaServicio,
        estatus,
>>>>>>> e9a82e4b (historial fixed)
    );
    const historialId = await nuevoHistorial.save();

    res.status(201).json({
<<<<<<< HEAD
      idHistorial: historialId,
=======
      id: historialId,
>>>>>>> e9a82e4b (historial fixed)
      mensaje: "Historial registrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
<<<<<<< HEAD
      error: "Error al registrar el historial",
=======
      error: "Error al crear el historial",
>>>>>>> e9a82e4b (historial fixed)
      detalle: error.message,
    });
  }
};

<<<<<<< HEAD
// Obtener todos los historiales
exports.obtenerHistorial = async (req, res) => {
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
=======
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
>>>>>>> e9a82e4b (historial fixed)
      detalle: error.message,
    });
  }
};
