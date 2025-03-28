const Vehiculo = require("../models/vehiculos");

// Crear un nuevo vehículo
exports.crearVehiculo = async (req, res) => {
  try {
    const {idUsuario, marca, modelo, year, placa, color} = req.body;

    if (!idUsuario || !marca || !modelo || !year || !placa || !color) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    const nuevoVehiculo = new Vehiculo(
        idUsuario,
        marca,
        modelo,
        year,
        placa,
        color,
    );
    const vehiculoId = await nuevoVehiculo.save();
    res.status(201).json({
      id: vehiculoId,
      mensaje: "Vehículo registrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar el vehículo",
      detalle: error.message,
    });
  }
};

// Obtener todos los vehículos
exports.obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.getAll();
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los vehículos",
      detalle: error.message,
    });
  }
};

// Obtener un vehículo por ID
exports.obtenerVehiculoPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const vehiculo = await Vehiculo.getById(id);
    res.status(200).json(vehiculo);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el vehículo",
      detalle: error.message,
    });
  }
};

// Actualizar un vehículo
exports.actualizarVehiculo = async (req, res) => {
  try {
    const {id} = req.params;
    const datosActualizados = req.body;
    await Vehiculo.updateById(id, datosActualizados);
    res.status(200).json({
      mensaje: "Vehículo actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el vehículo",
      detalle: error.message,
    });
  }
};

// Eliminar un vehículo
exports.eliminarVehiculo = async (req, res) => {
  try {
    const {id} = req.params;
    await Vehiculo.deleteById(id);
    res.status(200).json({
      mensaje: "Vehículo eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el vehículo",
      detalle: error.message,
    });
  }
};
