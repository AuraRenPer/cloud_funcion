/* eslint-disable new-cap */

const ServicioModel = require(
    "../models/servicioModel",
);

/**
   * Crea un nuevo servicio (solo para proveedores).
   * @param {Object} req - El objeto de solicitud de Express.
   * @param {Object} res - El objeto de respuesta de Express.
   */
const crearServicio = async (req, res) => {
  try {
    const {
      nombreServicio,
      descripcion,
      precio,
      duracionEstimada,
      idProveedor,
    } = req.body;

    if (
      !nombreServicio ||
        !descripcion ||
        !precio ||
        !duracionEstimada ||
        !idProveedor
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios.",
      });
    }

    const nuevoServicio = new ServicioModel(
        nombreServicio,
        descripcion,
        precio,
        duracionEstimada,
        idProveedor,
    );
    const servicioId = await nuevoServicio.save();

    res.status(201).json({
      mensaje: "Servicio creado exitosamente",
      idServicio: servicioId,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el servicio",
      detalle: error.message,
    });
  }
};

/**
   * Obtiene todos los servicios de un proveedor.
   * @param {Object} req - El objeto de solicitud de Express.
   * @param {Object} res - El objeto de respuesta de Express.
   */
const obtenerServiciosPorProveedor = async (req, res) => {
  try {
    const {idProveedor} = req.params;
    const servicios = await ServicioModel.getByProveedorId(idProveedor);
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener servicios",
      detalle: error.message,
    });
  }
};

/**
   * Obtiene un servicio por su ID (validando que pertenezca al proveedor).
   * @param {Object} req - El objeto de solicitud de Express.
   * @param {Object} res - El objeto de respuesta de Express.
   */
const obtenerServicioPorId = async (req, res) => {
  try {
    const {idServicio, idProveedor} = req.params;
    const servicio = await ServicioModel.getById(idServicio, idProveedor);
    res.status(200).json(servicio);
  } catch (error) {
    res.status(404).json({
      error: "Servicio no encontrado",
      detalle: error.message,
    });
  }
};

/**
   * Actualiza un servicio por su ID (solo el proveedor dueño puede hacerlo).
   * @param {Object} req - El objeto de solicitud de Express.
   * @param {Object} res - El objeto de respuesta de Express.
   */
const actualizarServicio = async (req, res) => {
  try {
    const {idServicio} = req.params;
    const {idProveedor, ...data} = req.body;

    if (!idProveedor) {
      return res.status(400).json({
        error: "El ID del proveedor es obligatorio.",
      });
    }

    const servicioActualizado = await ServicioModel.updateById(
        idServicio,
        idProveedor,
        data,
    );
    res.status(200).json({
      mensaje: "Servicio actualizado con éxito",
      servicio: servicioActualizado,
    });
  } catch (error) {
    res.status(403).json({
      error: "No tienes permiso para modificar este servicio",
      detalle: error.message,
    });
  }
};

/**
   * Elimina un servicio por su ID (solo el proveedor dueño puede hacerlo).
   * @param {Object} req - El objeto de solicitud de Express.
   * @param {Object} res - El objeto de respuesta de Express.
   */
const eliminarServicio = async (req, res) => {
  try {
    const {idServicio} = req.params;
    const {idProveedor} = req.body;

    if (!idProveedor) {
      return res.status(400).json({
        error: "El ID del proveedor es obligatorio.",
      });
    }

    const resultado = await ServicioModel.deleteById(idServicio, idProveedor);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(403).json({
      error: "No tienes permiso para eliminar este servicio",
      detalle: error.message,
    });
  }
};

module.exports = {
  crearServicio,
  obtenerServiciosPorProveedor,
  obtenerServicioPorId,
  actualizarServicio,
  eliminarServicio,
};
