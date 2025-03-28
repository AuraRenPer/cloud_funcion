const admin = require("firebase-admin");
const db = admin.firestore();

const HISTORIAL_COLLECTION = "historial";

/**
 * Clase para representar un Historial de Citas.
 */
class Historial {
  /**
  * Constructor de la clase Historial.
  * @param {string} idCita - ID de la cita.
  * @param {string} idUsuario - ID del usuario.
  * @param {string} idProveedor - ID del proveedor.
  * @param {string} idServicio - ID del servicio.
  * @param {string} fechaRealizacion - Fecha de la realización del servicio.
  * @param {string} estatus
  *  - Estado de la cita (Pendiente, Confirmada, Cancelada, Completada).
  */
  constructor(
      idCita,
      idUsuario,
      idProveedor,
      idServicio,
      fechaRealizacion,
      estatus = "Pendiente", // 🔹 Por defecto
  ) {
    this.idCita = idCita;
    this.idUsuario = idUsuario;
    this.idProveedor = idProveedor;
    this.idServicio = idServicio;
    this.fechaRealizacion = fechaRealizacion;
    this.estatus = estatus;
  }

  /**
   * Guarda un nuevo Historial en Firestore.
   * @return {Promise<string>} ID del historial guardado.
   */
  async save() {
    const historialRef = db.collection(HISTORIAL_COLLECTION).doc();
    const idHistorial = historialRef.id;

    await historialRef.set({
      idHistorial: idHistorial, // 🔹 Se almacena el ID de Firebase
      idCita: this.idCita,
      idUsuario: this.idUsuario,
      idProveedor: this.idProveedor,
      idServicio: this.idServicio,
      fechaRealizacion: this.fechaRealizacion,
      estatus: this.estatus,
    });

    return idHistorial;
  }

  /**
   * Obtiene todos los historiales.
   * @return {Promise<Object[]>} Lista de historiales.
   */
  static async getAll() {
    const snapshot = await db.collection(HISTORIAL_COLLECTION).get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
   * Obtiene un historial por su ID.
   * @param {string} id - ID del historial.
   * @return {Promise<Object>} Datos del historial.
   */
  static async getById(id) {
    const doc = await db.collection(HISTORIAL_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Historial no encontrado");
    }
    return {id: doc.id, ...doc.data()};
  }

  /**
   * Obtiene todos los historiales de un usuario.
   * @param {string} idUsuario - ID del usuario.
   * @return {Promise<Object[]>} Lista de historiales del usuario.
   */
  static async getByUsuario(idUsuario) {
    const snapshot = await db.collection(HISTORIAL_COLLECTION)
        .where("idUsuario", "==", idUsuario)
        .get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }
}

module.exports = Historial;
