const Solicitud = require("../models/solicitud");
const {
  obtenerSolicitudes,
  obtenerSolicitudesPorUsuario,
  obtenerSolicitudesPorProveedor,
  actualizarEstadoSolicitud,
} = require("../models/solicitud");

/**
 * Crea una nueva solicitud de servicio.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @return {Promise<void>}
 */
exports.crearSolicitudController = async (req, res) => {
  try {
    const {idUsuario, idProveedor, idServicio} = req.body;

    if (!idUsuario || !idProveedor || !idServicio) {
      return res.status(400).json({
        error: "Todos los campos obligatorios deben ser completados.",
      });
    }

    const nuevaSolicitud = new Solicitud(idUsuario, idProveedor, idServicio);
    const solicitudId = await nuevaSolicitud.save();

    res.status(201).json({
      solicitudId: solicitudId,
      mensaje: "Solicitud registrada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar la solicitud",
      detalle: error.message,
    });
  }
};

/**
 * Obtiene todas las solicitudes de servicio.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @return {Promise<void>}
 */
exports.obtenerSolicitudesController = async (req, res) => {
  try {
    const solicitudes = await obtenerSolicitudes();
    return res.status(200).json({success: true, data: solicitudes});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener solicitudes.",
      error,
    });
  }
};

/**
 * Obtiene las solicitudes de un usuario específico.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @return {Promise<void>}
 */
exports.obtenerSolicitudesPorUsuarioController = async (req, res) => {
  try {
    const {idUsuario} = req.params;
    const solicitudes = await obtenerSolicitudesPorUsuario(idUsuario);
    return res.status(200).json({success: true, data: solicitudes});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener solicitudes del usuario.",
      error,
    });
  }
};

/**
 * Obtiene las solicitudes de un proveedor específico.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @return {Promise<void>}
 */
exports.obtenerSolicitudesPorProveedorController = async (req, res) => {
  try {
    const {idProveedor} = req.params;
    const solicitudes = await obtenerSolicitudesPorProveedor(idProveedor);
    return res.status(200).json({success: true, data: solicitudes});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener solicitudes del proveedor.",
      error,
    });
  }
};

/**
 * Actualiza el estado de una solicitud.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @return {Promise<void>}
 */
exports.actualizarEstadoSolicitudController = async (req, res) => {
  try {
    const {idSolicitud} = req.params;
    const {estado} = req.body;

    if (![
      "Pendiente",
      "Aceptada",
      "Rechazada",
      "En proceso",
    ].includes(estado)) {
      return res.status(400).json({
        success: false,
        message: "Estado no válido.",
      });
    }

    const solicitudActualizada = await actualizarEstadoSolicitud(
        idSolicitud,
        estado,
    );

    res.status(200).json({
      success: true,
      data: solicitudActualizada,
      message: "Estado de solicitud actualizado exitosamente.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar estado de la solicitud.",
      error,
    });
  }
};
