const admin = require("firebase-admin");
const db = admin.firestore();

const SOLICITUDES_COLLECTION = "solicitudes_servilink";

/**
 * Clase para representar una solicitud de servicio
 */
class Solicitud {
  /** *
     * Constructor de la clase solicitud.
     * @param {string} idUsuario - ID del usuario que agenda la cita.
     * @param {string} idProveedor - ID del proveedor del servicio.
     * @param {string} idServicio - ID del servicio seleccionado.
     * @param {string} estado
     */
  constructor(
      idUsuario,
      idProveedor,
      idServicio,
      estado = "Pendiente",
  ) {
    this.idUsuario = idUsuario;
    this.idProveedor = idProveedor;
    this.idServicio = idServicio;
    this.estado = estado;
  }

  /**
   * Guarda una nueva solicitud en Firestore.
   * @return {Promise<string>} ID de la cita guardada.
   */
  async save() {
    const solicitudRef = db.collection(SOLICITUDES_COLLECTION).doc();
    const idSolicitud = solicitudRef.id;

    await solicitudRef.set({
      idSolicitud: idSolicitud,
      idUsuario: this.idUsuario,
      idProveedor: this.idProveedor,
      idServicio: this.idServicio,
      estado: this.estado,
    });

    return idSolicitud;
  }

  /**
     * Obtiene todas las citas de la colección.
     * @return {Promise<Object[]>} Lista de citas.
     */
  static async getAll() {
    const snapshot = await db.collection(SOLICITUDES_COLLECTION).get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
     * Obtiene las solicitudes de un usuario en específico.
     * @param {string} idUsuario - ID del usuario.
     * @return {Promise<Object[]>} Lista de citas del usuario.
     */
  static async obtenerSolicitudesPorUsuario(idUsuario) {
    const snapshot = await db.collection(SOLICITUDES_COLLECTION)
        .where("idUsuario", "==", idUsuario)
        .get();

    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
     * Obtiene las solicitudes de un proveedor en específico.
     * @param {string} idProveedor - ID del proveedor.
     * @return {Promise<Object[]>} Lista de citas del proveedor.
     */
  static async obtenerSolicitudesPorProveedor(idProveedor) {
    const snapshot = await db.collection(SOLICITUDES_COLLECTION)
        .where("idProveedor", "==", idProveedor)
        .get();

    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
     * Actualizar el estado de una solicitud
     *  @param {string} idSolicitud - ID de la solicitud.
     * @param {string} estado
     * - Nuevo estado (Pendiente, Aceptada, Rechazada, En proceso).
     * @return {Promise<Object[]>} Lista de citas del proveedor.
    */
  static async actualizarEstadoSolicitud(idSolicitud, estado) {
    await db.collection(
        SOLICITUDES_COLLECTION,
    ).doc(
        idSolicitud)
        .update({
          estado,
        });

    // Obtener la solicitud actualizada y retornarla
    const solicitudActualizada = await db.collection(
        SOLICITUDES_COLLECTION,
    ).doc(
        idSolicitud,
    ).get();

    if (!solicitudActualizada.exists) {
      throw new Error("Solicitud no encontrada.");
    }

    return {id: idSolicitud, ...solicitudActualizada.data()};
  }
}

module.exports = Solicitud;
