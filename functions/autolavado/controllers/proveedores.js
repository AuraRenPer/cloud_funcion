const Proveedor = require("../models/proveedores");

// Crear un nuevo proveedor
exports.crearProveedor = async (req, res) => {
  try {
    const {
      nombreAutolavado,
      correo,
      telefono,
      ubicacionId,
      estatus,
      horarioAtencion,
      capacidadMaxima,
    } = req.body;

    if (
      !nombreAutolavado ||
      !correo ||
      !telefono ||
      !ubicacionId ||
      !estatus ||
      !horarioAtencion ||
      !capacidadMaxima
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    const nuevoProveedor = new Proveedor(
        nombreAutolavado,
        correo,
        telefono,
        ubicacionId,
        estatus,
        horarioAtencion,
        capacidadMaxima,
    );
    const proveedorId = await nuevoProveedor.save();

    res.status(201).json({
      id: proveedorId,
      mensaje: "Proveedor registrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar el proveedor",
      detalle: error.message,
    });
  }
};

// Obtener todos los proveedores
exports.obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.getAll();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los proveedores",
      detalle: error.message,
    });
  }
};

// Obtener un proveedor por ID
exports.obtenerProveedorPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const proveedor = await Proveedor.getById(id);
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el proveedor",
      detalle: error.message,
    });
  }
};

// Actualizar un proveedor
exports.actualizarProveedor = async (req, res) => {
  try {
    const {id} = req.params;
    const datosActualizados = req.body;
    await Proveedor.updateById(id, datosActualizados);
    res.status(200).json({
      mensaje: "Proveedor actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el proveedor",
      detalle: error.message,
    });
  }
};

// Eliminar un proveedor
exports.eliminarProveedor = async (req, res) => {
  try {
    const {id} = req.params;
    await Proveedor.deleteById(id);
    res.status(200).json({
      mensaje: "Proveedor eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el proveedor",
      detalle: error.message,
    });
  }
};
