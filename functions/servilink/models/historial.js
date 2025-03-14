const admin = require("firebase-admin");
const db = admin.firestore();

const HISTORIAL_COLLECTION = "historial";

/**
 * Clase para representar un historial de servicio en el autolavado.
 */
class Historial {
  /**
   * Constructor de la clase Historial.
   * @param {string} id - ID del historial.
   * @param {string} idUsuario - ID del usuario.
   * @param {string} idProveedor - ID del proveedor.
   * @param {string} idServicio - ID del servicio.
   * @param {string} fechaServicio - Fecha del servicio.
   * @param {string} estatus - Estado del servicio (completado | cancelado).
   */
  constructor(id, idUsuario, idProveedor, idServicio, fechaServicio, estatus) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.idProveedor = idProveedor;
    this.idServicio = idServicio;
    this.fechaServicio = fechaServicio;
    this.estatus = estatus;
  }

  /**

   * Guarda un nuevo historial en Firestore.
   * @return {Promise<string>} ID del historial guardado.
   */
  async save() {
    const historialRef = db.collection(HISTORIAL_COLLECTION).doc();
    console.log("ID del historial:", historialRef.id);
    await historialRef.set({
      idUsuario: this.idUsuario,
      idProveedor: this.idProveedor,
      idServicio: this.idServicio,
      fechaServicio: this.fechaServicio,
      estatus: this.estatus,
    });
    return historialRef.id;
  }

  /**
   * Obtiene un historial por su ID.
   * @param {string} idHistorial - ID del historial.
   * @return {Promise<Object|null>} Datos del historial.
   */
  static async getById(idHistorial) {
    const doc = await db.collection(
        HISTORIAL_COLLECTION,
    ).doc(
        idHistorial,
    ).get();
    return doc.exists ? {id: doc.id, ...doc.data()} : null;
  }

  /**
   * Obtiene todos los historiales de un usuario.
   * @param {string} idUsuario - ID del usuario.
   * @return {Promise<Array>} Lista de historiales del usuario.
   */
  static async getByUsuario(idUsuario) {
    const snapshot = await db
        .collection(HISTORIAL_COLLECTION)
        .where("idUsuario", "==", idUsuario)
        .get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }
}

module.exports = Historial;
