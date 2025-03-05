const Proveedor = require("../models/proveedor");

exports.crearProveedor = async (req, res) => {
  try {
    const nuevoProveedor = await Proveedor.create(req.body);
    res.status(201).json({
      mensaje: "Proveedor creado exitosamente",
      proveedor: nuevoProveedor,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el proveedor",
      detalle: error.message,
    });
  }
};

exports.obtenerProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.getById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({error: "Proveedor no encontrado"});
    }
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el proveedor",
      detalle: error.message,
    });
  }
};

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

exports.actualizarProveedor = async (req, res) => {
  try {
    const proveedorActualizado =
    await Proveedor.update(req.params.id, req.body);

    res.status(200).json({
      mensaje: "Proveedor actualizado correctamente",
      proveedor: proveedorActualizado,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el proveedor",
      detalle: error.message,
    });
  }
};

exports.eliminarProveedor = async (req, res) => {
  try {
    await Proveedor.delete(req.params.id);
    res.status(200).json({mensaje: "Proveedor eliminado correctamente"});
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el proveedor",
      detalle: error.message,
    });
  }
};
