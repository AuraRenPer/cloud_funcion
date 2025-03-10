const admin = require("firebase-admin");
const db = admin.firestore();

const HISTORIAL_COLLECTION = "historial";

/**
 * Clase para representar una Historial. (Autolavado)
 */
class Historiales {
  /**
  * Constructor de la clase Historials.
  * @param {string} id - ID de la Historial.
  * @param {string} idCliente - ID del cliente.
  * @param {string} idProveedor - ID del proveedor.
  * @param {string} idServicio - ID del servicio.
  * @param {string} fechaHistorial - Fecha de la Historial.
  * @param {string} horaHistorial - Hora de la Historial.
  * @param {string} estatus - Estado de la Historial.
  *
  */
  constructor(
      id,
      idCliente,
      idProveedor,
      idServicio,
      fechaHistorial,
      horaHistorial,
      estatus,
  ) {
    this.id = id;
    this.idCliente = idCliente;
    this.idProveedor = idProveedor;
    this.idServicio = idServicio;
    this.idVehiculo = idVehiculo;
    this.fechaHistorial = fechaHistorial || "No especificada"; // Valor por defecto
    this.horaHistorial = horaHistorial || "No especificada";
    this.estatus = estatus || "pendiente";
  }

  /**
   * Guarda una nueva Historial en Firestore.
   * @return {Promise<string>} ID de la Historial guardada.
   */
  async save() {
    const HistorialRef = db.collection(HISTORIAL_COLLECTION).doc();
    await HistorialRef.set({
      idCliente: this.idCliente,
      idProveedor: this.idProveedor,
      idServicio: this.idServicio,
      fechaHistorial: this.fechaHistorial,
      horaHistorial: this.horaHistorial,
      estatus: this.estatus,
    });
    return HistorialRef.id;
  }

  /**
   * Obtiene todas las Historials de la colección.
   * @return {Promise<Object[]>} Lista de Historials.
   */
  static async getAll() {
    const snapshot = await db.collection(HISTORIAL_COLLECTION).get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }


  /**
   * Obtiene una Historial por su ID.
   * @param {string} id - ID de la Historial.
   * @return {Promise<Object>} Historial.
   */
  static async getById(id) {
    const doc = await db.collection(HISTORIAL_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Historial no encontrada");
    }
    return {id: doc.id, ...doc.data()};
  }

  /**
   * Actualiza una Historial en Firestore.
   * @param {string} id - ID de la Historial.
   * @param {Object} data - Datos de la Historial a actualizar.
   * @return {Promise<void>} - Datos actualizados de laa Historial
   */
  static async updateById(id, data) {
    await db.collection(HISTORIAL_COLLECTION).doc(id).update(data);
    return {id, ...data};
  }

  /**
   * Elimina una Historial de Firestore.
   * @param {string} id - ID de la Historial.
   * @return {Promise<void>}
   */
  static async deleteById(id) {
    await db.collection(HISTORIAL_COLLECTION).doc(id).delete();
    return {id, message: "Historial eliminada"};
  }

  /**
   * Obtiene todas las Historials de un cliente.
   * @param {string} idCliente - ID del cliente.
   * @return {Promise<Object[]>} Lista de Historials.  
   */
  static async getByUserId(idUsuario){
    const snapshot = await db.collection(HISTORIAL_COLLECTION).where("idCliente", "==", idUsuario).get();
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({id: doc.id, ...doc
    .data()}
    ));
  }
}

module.exports = Historiales;
