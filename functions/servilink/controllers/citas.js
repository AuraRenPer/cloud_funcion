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
    } = req.body;

    if (!idUsuario || !idProveedor || !idServicio || !fechaCita || !horaCita) {
      return res.status(400).json({
        error: "Todos los campos obligatorios deben ser completados.",
      });
    }

    const citasProveedor = await Cita.getByProveedor(idProveedor);
    const citaDuplicada = citasProveedor.find(
        (c) => c.fechaCita === fechaCita && c.horaCita === horaCita,
    );

    if (citaDuplicada) {
      return res.status(409).json({
        error: "Ya existe una cita para este proveedor en esa fecha y hora.",
      });
    }

    const nuevaCita = new Cita(
        idUsuario,
        idProveedor,
        idServicio,
        fechaCita,
        horaCita,
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
    const citas = await Citas.getAll();
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

