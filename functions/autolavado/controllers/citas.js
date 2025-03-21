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
      estatus,
    } = req.body;

    if (
      !idUsuario ||
        !idProveedor ||
        !idServicio ||
        !idVehiculo ||
        !fechaCita ||
        !horaCita ||
        !estatus
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }
    const nuevaCita = new Citas(
        idUsuario,
        idProveedor,
        idServicio,
        idVehiculo,
        fechaCita,
        horaCita,
    );

    const citaId = await nuevaCita.save();


    res.status(201).json({
      idCita: citaId,
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
    const citas = await Citas.getAll();
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
    const citas = await Citas.getByUsuario(idUsuario);
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
    const citas = await Citas.getByProveedor(idProveedor);
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las citas del proveedor",
      detalle: error.message,
    });
  }
};
