const admin = require("firebase-admin");
const db = admin.firestore();

const PROVEEDORES_COLLECTION = "proveedores_servilink";

/**
 * Clase para representar un Proveedor (Autolavado).
 */
class Proveedor {
  /**
   * Constructor de la clase Proveedor.
   * @param {string} nombreAutolavado - Nombre del autolavado.
   * @param {string} correo - Correo del proveedor.
   * @param {string} telefono - Teléfono del proveedor.
   * @param {string} ubicacionId - ID de la ubicación del autolavado.
   * @param {string} estatus - Estado del proveedor (activo/inactivo).
   * @param {string} horarioAtencion - Horario de atención.
   * @param {number} capacidadMaxima - Capacidad máxima de vehículos.
   */
  constructor(
      nombreAutolavado,
      correo,
      telefono,
      ubicacionId,
      estatus,
      horarioAtencion,
      capacidadMaxima,
  ) {
    this.nombreAutolavado = nombreAutolavado;
    this.correo = correo;
    this.telefono = telefono;
    this.ubicacionId = ubicacionId;
    this.estatus = estatus;
    this.horarioAtencion = horarioAtencion;
    this.capacidadMaxima = capacidadMaxima;
  }

  /**
   * Guarda un nuevo proveedor en Firestore.
   * @return {Promise<string>} ID del proveedor guardado.
   */
  async save() {
    const proveedorRef = db.collection(PROVEEDORES_COLLECTION).doc();
    await proveedorRef.set({
      nombreAutolavado: this.nombreAutolavado,
      correo: this.correo,
      telefono: this.telefono,
      ubicacionId: this.ubicacionId,
      estatus: this.estatus,
      horarioAtencion: this.horarioAtencion,
      capacidadMaxima: this.capacidadMaxima,
    });
    return proveedorRef.id;
  }

  /**
   * Obtiene todos los proveedores de la colección.
   * @return {Promise<Object[]>} Lista de proveedores.
   */
  static async getAll() {
    const snapshot = await db.collection(PROVEEDORES_COLLECTION).get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
   * Obtiene un proveedor por su ID.
   * @param {string} id - ID del proveedor.
   * @return {Promise<Object>} Datos del proveedor.
   * @throws {Error} Si el proveedor no se encuentra.
   */
  static async getById(id) {
    const doc = await db.collection(PROVEEDORES_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Proveedor no encontrado");
    }
    return {id: doc.id, ...doc.data()};
  }

  /**
   * Actualiza un proveedor por su ID.
   * @param {string} id - ID del proveedor.
   * @param {Object} data - Datos a actualizar.
   * @return {Promise<Object>} Datos actualizados del proveedor.
   */
  static async updateById(id, data) {
    await db.collection(PROVEEDORES_COLLECTION).doc(id).update(data);
    return {id, ...data};
  }

  /**
   * Elimina un proveedor por su ID.
   * @param {string} id - ID del proveedor.
   * @return {Promise<Object>} Mensaje de eliminación.
   */
  static async deleteById(id) {
    await db.collection(PROVEEDORES_COLLECTION).doc(id).delete();
    return {id, mensaje: "Proveedor eliminado correctamente"};
  }
}

module.exports = Proveedor;
