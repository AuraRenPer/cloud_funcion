const admin = require("firebase-admin");
const db = admin.firestore();

const CITAS_COLLECTION = "citas";

/**
 * Clase para representar una Cita. (Autolavado)
 */
class Citas {
  /**
  * Constructor de la clase Citas.
  * @param {string} id - ID de la cita.
  * @param {string} idCliente - ID del cliente.
  * @param {string} idProveedor - ID del proveedor.
  * @param {string} idServicio - ID del servicio.
  * @param {string} idVehiculo - ID del vehículo.
  * @param {string} fechaCita - Fecha de la cita.
  * @param {string} horaCita - Hora de la cita.
  * @param {string} estatus - Estado de la cita.
  *
  */
  constructor(
      id,
      idCliente,
      idProveedor,
      idServicio,
      idVehiculo,
      fechaCita,
      horaCita,
      estatus,
  ) {
    this.id = id;
    this.idCliente = idCliente;
    this.idProveedor = idProveedor;
    this.idServicio = idServicio;
    this.idVehiculo = idVehiculo;
    this.fechaCita = fechaCita || "No especificada"; // Valor por defecto
    this.horaCita = horaCita || "No especificada";
    this.estatus = estatus || "pendiente";
  }

  /**
   * Guarda una nueva cita en Firestore.
   * @return {Promise<string>} ID de la cita guardada.
   */
  async save() {
    const citaRef = db.collection(CITAS_COLLECTION).doc();
    await citaRef.set({
      idCliente: this.idCliente,
      idProveedor: this.idProveedor,
      idServicio: this.idServicio,
      idVehiculo: this.idVehiculo,
      fechaCita: this.fechaCita,
      horaCita: this.horaCita,
      estatus: this.estatus,
    });
    return citaRef.id;
  }

  /**
   * Obtiene todas las citas de la colección.
   * @return {Promise<Object[]>} Lista de citas.
   */
  static async getAll() {
    const snapshot = await db.collection(CITAS_COLLECTION).get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }


  /**
   * Obtiene una cita por su ID.
   * @param {string} id - ID de la cita.
   * @return {Promise<Object>} Cita.
   */
  static async getById(id) {
    const doc = await db.collection(CITAS_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Cita no encontrada");
    }
    return {id: doc.id, ...doc.data()};
  }

  /**
   * Actualiza una cita en Firestore.
   * @param {string} id - ID de la cita.
   * @param {Object} data - Datos de la cita a actualizar.
   * @return {Promise<void>} - Datos actualizados de laa cita
   */
  static async updateById(id, data) {
    await db.collection(CITAS_COLLECTION).doc(id).update(data);
    return {id, ...data};
  }

  /**
   * Elimina una cita de Firestore.
   * @param {string} id - ID de la cita.
   * @return {Promise<void>}
   */
  static async deleteById(id) {
    await db.collection(CITAS_COLLECTION).doc(id).delete();
    return {id, message: "Cita eliminada"};
  }

  /**
   * Obtiene todas las citas de un cliente.
   * @param {string} idCliente - ID del cliente.
   * @return {Promise<Object[]>} Lista de citas.
   */
  static async getByUserId(idCliente) {
    const snapshot = await db.collection(CITAS_COLLECTION).where(
        "idCliente",
        "==",
        idCliente,
    ).get();
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({id: doc.id, ...doc
        .data()}
    ));
  }
}

module.exports = Citas;
