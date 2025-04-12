const Cita = require("../models/citas");

// Crear una nueva cita
exports.crearCita = async (req, res) => {
  try {
    const {
      idUsuario,
      idProveedor,
      idServicio,
      fechaCita,
      horaCita,
      fechaRealizacion,
      estado,
    } = req.body;

    if (
      !idUsuario ||
      !idProveedor ||
      !idServicio ||
      (!fechaRealizacion && (!fechaCita || !horaCita))
    ) {
      return res.status(400).json({
        error: "Todos los campos obligatorios deben ser completados.",
      });
    }

    // Extraer fecha y hora si se recibe fechaRealizacion
    let fechaFinal = fechaCita;
    let horaFinal = horaCita;

    if (fechaRealizacion) {
      const fecha = new Date(fechaRealizacion);
      fechaFinal = fecha.toISOString().split("T")[0];
      horaFinal = fecha.toTimeString().substring(0, 5);
    }

    // Verificar citas duplicadas
    const citasProveedor = await Cita.getByProveedor(idProveedor);
    const citaDuplicada = citasProveedor.find(
        (c) => c.fechaCita === fechaFinal && c.horaCita === horaFinal,
    );

    if (citaDuplicada) {
      return res.status(409).json({
        error: "Ya existe una cita para este proveedor en esa fecha y hora.",
      });
    }

    // Crear cita
    const nuevaCita = new Cita(
        idUsuario,
        idProveedor,
        idServicio,
        fechaCita,
        horaCita,
        estado,
        fechaRealizacion, // ← solo se usa si viene
    );

    const citaId = await nuevaCita.save();

    res.status(201).json({
      idCita: citaId,
      mensaje: "Cita registrada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar la cita",
      detalle: error.message,
    });
  }
};

// Obtener todas las citas
exports.obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.getAll();
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
    const cita = await Cita.getById(id);

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

    await Cita.updateById(id, datosActualizados);

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

    await Cita.deleteById(id);

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

// Obtener citas de un usuario
exports.obtenerCitasPorUsuario = async (req, res) => {
  try {
    const {idUsuario} = req.params;
    const citas = await Cita.getByUsuario(idUsuario);
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las citas del usuario",
      detalle: error.message,
    });
  }
};

// Obtener citas de un proveedor
exports.obtenerCitasPorProveedor = async (req, res) => {
  try {
    const {idProveedor} = req.params;
    const citas = await Cita.getByProveedor(idProveedor);
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las citas del proveedor",
      detalle: error.message,
    });
  }
};


exports.obtenerFechasOcupadas = async (req, res) => {
  try {
    const citas = await Cita.getAll();
    const fechasOcupadas = citas.map((cita) => ({
      fecha: cita.fechaCita,
      hora: cita.horaCita,
    }));

    res.status(200).json(fechasOcupadas);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las fechas ocupadas",
      detalle: error.message,
    });
  }
};

