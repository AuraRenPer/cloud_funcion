const Historiales = require("../models/historial");

// Crear una nuevo historial
exports.crearHistorial = async (req, res) => {
  try {
    const {
      idUsuario,
      idProveedor,
      idServicio,
      fechaHistorial,
      horaHistorial,
      estatus,
    } = req.body;

    if (
      !idUsuario ||
      !idProveedor ||
      !idServicio ||
      !fechaHistorial ||
      !horaHistorial ||
      !estatus
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }
    const nuevoHistorial = new Historiales(
      idUsuario,
      idProveedor,
      idServicio,
      fechaHistorial,
      horaHistorial,
    );

    const historialId = await nuevoHistorial.save();


    res.status(201).json({
      id: historialId.id,
      mensaje: "Historial creada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear la historial",
      detalle: error.message,
    });
  }
};

// Obtener todas las historiales
exports.obtenerHistorial = async (req, res) => {
  try {
    const historiales = await Historiales.getAll();

    if (!historiales || historiales.length === 0) {
      return res.status(200).json({
        mensaje: "No hay historiales registradas",
        historiales: [],
      });
    }

    res.status(200).json(historiales);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las historiales",
      detalle: error.message,
    });
  }
};


// Obtener una historial por ID
exports.obtenerHistorialPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await Historiales.getById(id);

    if (!historial.exists) {
      return res.status(404).json({ error: "Historial no encontrada" });
    }

    res.status(200).json({
      id: historial.id,
      ...historial.data(),
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la historial",
      detalle: error.message,
    });
  }
};

// Actualizar una historiales
exports.actualizarHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    if (!id || Object.keys(datosActualizados).length === 0) {
      return res.status(400).json({
        error: "ID de la historiales y otro dato obligatorio",
      });
    }

    await Historiales.updateById(id, datosActualizados);

    res.status(200).json({
      mensaje: "Historial actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar la historial",
      detalle: error.message,
    });
  }
};


// Eliminar una historial
exports.eliminarHistorial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "El ID de la historial es obligatorio",
      });
    }

    await Historiales.deleteById(id);

    res.status(200).json({
      mensaje: "Historial eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar la historial",
      detalle: error.message,
    });
  }
}

  // Obtener historiales por ID de usuario
  exports.obtenerHistorialPorUsuario = async (req, res) => {
    try {
      const { idUsuario } = req.params;

      if (!idUsuario) {
        return res.status(400).json({
          error: "ID de usuario es obligatorio",
        });
      }

      const historiales = await Historiales.getByUserId(idUsuario);

      res.status(200).json(historiales);

    } catch (error) {
      res.status(500).json({
        error: "Error al obtener las historiales",
        detalle: error.message
      });
    }
  }
