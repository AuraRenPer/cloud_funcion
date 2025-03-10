const Citas = require("../models/citas");

// Crear una nueva cita
exports.crearCita = async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", req.body);

    const {
      idUsuario,
      idProveedor,
      idServicio,
      fechaCita,
      horaCita,
      estatus,
    } = req.body;

    // Verificación de campos obligatorios
    if (
      !idUsuario ||
      !idProveedor ||
      !idServicio ||
      !fechaCita ||
      !horaCita ||
      !estatus
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    console.log("Intentando guardar cita en Firestore...");

    // Crear nueva instancia de Citas
    const nuevaCita = new Citas(
        idUsuario,
        idProveedor,
        idServicio,
        fechaCita,
        horaCita,
        estatus,
    );

    // Guardar la cita en Firestore
    const citaId = await nuevaCita.save();

    console.log("Cita guardada con éxito, ID:", citaId);

    res.status(201).json({
      id: citaId, // Se devuelve el ID generado por Firestore
      mensaje: "Cita creada exitosamente",
    });
  } catch (error) {
    console.error("Error al crear la cita:", error);

    res.status(500).json({
      error: "Error al crear la cita",
      detalle: error.message,
    });
  }
};


// Obtener todas las citas
exports.obtenerCitas = async (req, res) => {
  try {
    const citas = await Citas.getAll();

    if (!citas || citas.length === 0) {
      return res.status(200).json({
        mensaje: "No hay citas registradas",
        citas: [],
      });
    }

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las citas",
      detalle: error.message,
    });
  }
};


// Obtener una cita por ID
exports.obtenerCitaPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const cita = await Citas.getById(id);

    if (!cita.exists) {
      return res.status(404).json({error: "Cita no encontrada"});
    }

    res.status(200).json({
      id: cita.id,
      ...cita.data(),
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la cita",
      detalle: error.message,
    });
  }
};

// Actualizar una cita
exports.actualizarCita = async (req, res) => {
  try {
    const {id} = req.params;
    const datosActualizados = req.body;

    if (!id || Object.keys(datosActualizados).length === 0) {
      return res.status(400).json({
        error: "ID de la cita y otro dato obligatorio",
      });
    }

    await Citas.updateById(id, datosActualizados);

    res.status(200).json({
      mensaje: "Cita actualizada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar la cita",
      detalle: error.message,
    });
  }
};


// Eliminar una cita
exports.eliminarCita = async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({
        error: "El ID de la cita es obligatorio",
      });
    }

    await Citas.deleteById(id);

    res.status(200).json({
      mensaje: "Cita eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar la cita",
      detalle: error.message,
    });
  }
};

// Obtener citas por ID de usuario
exports.obtenerCitasPorUsuario = async (req, res) => {
  try {
    const {idUsuario} = req.params;

    if (!idUsuario) {
      return res.status(400).json({
        error: "ID de usuario es obligatorio",
      });
    }

    const citas = await Citas.getByUserId(idUsuario);

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las citas",
      detalle: error.message,
    });
  }
};
