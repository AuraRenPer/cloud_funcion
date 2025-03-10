const admin = require("firebase-admin");
const db = admin.firestore();

const SERVICIOS_COLLECTION = "servicios_servilink";

/**
 * Clase para representar un Servicio de autolavado.
 */
class Servicio {
  /**
   * Constructor de la clase Servicio.
   * @param {string} nombreServicio - Nombre del servicio.
   * @param {string} descripcion - Descripción del servicio.
   * @param {number} precio - Precio del servicio.
   * @param {string} duracionEstimada - Duración estimada del servicio.
   * @param {string} idProveedor - ID del proveedor que ofrece el servicio.
   */
  constructor(
      nombreServicio,
      descripcion,
      precio,
      duracionEstimada,
      idProveedor,
  ) {
    this.nombreServicio = nombreServicio;
    this.descripcion = descripcion;
    this.precio = precio;
    this.duracionEstimada = duracionEstimada;
    this.idProveedor = idProveedor;
  }

  /**
   * Guarda un nuevo servicio en Firestore.
   * @return {Promise<string>} ID del servicio guardado.
   */
  async save() {
    const servicioRef = db.collection(SERVICIOS_COLLECTION).doc();
    await servicioRef.set({
      nombreServicio: this.nombreServicio,
      descripcion: this.descripcion,
      precio: this.precio,
      duracionEstimada: this.duracionEstimada,
      idProveedor: this.idProveedor,
    });
    return servicioRef.id;
  }

  /**
   * Obtiene todos los servicios de la colección.
   * @return {Promise<Object[]>} Lista de servicios.
   */
  static async getAll() {
    const snapshot = await db.collection(SERVICIOS_COLLECTION).get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
   * Obtiene un servicio por su ID.
   * @param {string} id - ID del servicio.
   * @return {Promise<Object>} Datos del servicio.
   * @throws {Error} Si el servicio no se encuentra.
   */
  static async getById(id) {
    const doc = await db.collection(SERVICIOS_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Servicio no encontrado");
    }
    return {id: doc.id, ...doc.data()};
  }

  /**
   * Actualiza un servicio por su ID.
   * @param {string} id - ID del servicio.
   * @param {Object} data - Datos a actualizar.
   * @return {Promise<Object>} Datos actualizados del servicio.
   */
  static async updateById(id, data) {
    await db.collection(SERVICIOS_COLLECTION).doc(id).update(data);
    return {id, ...data};
  }

  /**
   * Elimina un servicio por su ID.
   * @param {string} id - ID del servicio.
   * @return {Promise<Object>} Mensaje de eliminación.
   */
  static async deleteById(id) {
    await db.collection(SERVICIOS_COLLECTION).doc(id).delete();
    return {id, mensaje: "Servicio eliminado correctamente"};
  }
}

module.exports = Servicio;
