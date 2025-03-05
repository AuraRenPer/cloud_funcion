const Citas = require("../models/citas");

// Crear una nueva cita
exports.crearCita = async (req, res) => {
  try {
    const {
      idUsuario,
      idProveedor,
      idServicio,
      idVehiculo,
      fechaCita,
      horaCita,
    } = req.body;

    if (
      !idUsuario ||
        !idProveedor ||
        !idServicio ||
        !idVehiculo ||
        !fechaCita ||
        !horaCita
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }
    const nuevaCita = await Citas.add({
      idUsuario,
      idProveedor,
      idServicio,
      idVehiculo,
      fechaCita,
      horaCita,
      estatus: "pendiente",
      fechaCreacion: new Date().toISOString(),
    });

    res.status(201).json({
      id: nuevaCita.id,
      mensaje: "Cita creada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear la cita",
      detalle: error.message,
    });
  }
};

// Obtener todas las citas
exports.obtenerCitas = async (req, res) => {
  try {
    const snapshot = await Citas.get();
    const citas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

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
    const cita = await Citas.doc(id).get();

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

    await Citas.doc(id).update(datosActualizados);

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

    await Citas.doc(id).delete();

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
