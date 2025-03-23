const Proveedor = require("../models/proveedor");
const Usuario = require("../models/usuario");

// Crear un nuevo proveedor
exports.crearProveedor = async (req, res) => {
  try {
    const {
      nombreEmpresa,
      correo,
      telefono,
      ubicacion,
      horarioServicio,
      serviciosDisponibles,
      estado,
      idUsuario,
      idCategoria,
    } = req.body;

    // Verificar campos requeridos
    const camposFaltantes = [];
    if (!nombreEmpresa) camposFaltantes.push("nombreEmpresa");
    if (!correo) camposFaltantes.push("correo");
    if (!telefono) camposFaltantes.push("telefono");
    if (!ubicacion) camposFaltantes.push("ubicacion");
    if (!horarioServicio) camposFaltantes.push("horarioServicio");
    if (!estado) camposFaltantes.push("estado");
    if (!idUsuario) camposFaltantes.push("idUsuario");
    if (!idCategoria) camposFaltantes.push("idCategoria");

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        error:
        `Los siguientes campos son obligatorios: 
        ${camposFaltantes.join(", ")}`,
      });
    }

    const nuevoProveedor = new Proveedor(
        nombreEmpresa,
        correo,
        telefono,
        ubicacion,
        horarioServicio,
        serviciosDisponibles,
        estado,
        idUsuario,
        idCategoria,
    );

    const proveedorId = await nuevoProveedor.save();
    await Usuario.updateById(idUsuario, {rol: "proveedor"});

    res.status(201).json({
      idProveedor: proveedorId,
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

exports.obtenerProveedoresPorCategoria = async (req, res) => {
  try {
    const {idCategoria} = req.params;

    const proveedores = await Proveedor.getByCategoria(idCategoria);

    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener proveedores por categoría",
      detalle: error.message,
    });
  }
};

