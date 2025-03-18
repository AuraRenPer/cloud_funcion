const admin = require("firebase-admin");
const db = admin.firestore();

const SERVICIOS_COLLECTION = "servicios_servilink";

/**
 * Modelo para representar
 * un Servicio de autolavado
 * (gestionado solo por proveedores).
 */
class ServicioModel {
  /**
   * Constructor del modelo ServicioModel.
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
   * Guarda un nuevo servicio en Firestore
   * (solo proveedores pueden agregar servicios).
   * @return {Promise<string>} ID del servicio guardado.
   */
  async save() {
    if (!this.idProveedor) {
      throw new Error("Solo los proveedores pueden crear servicios.");
    }

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
   * Obtiene todos los servicios de un proveedor.
   * @param {string} idProveedor - ID del proveedor.
   * @return {Promise<Object[]>} Lista de servicios del proveedor.
   */
  static async getByProveedorId(idProveedor) {
    if (!idProveedor) {
      throw new Error("ID de proveedor es requerido.");
    }

    const snapshot = await db
        .collection(SERVICIOS_COLLECTION)
        .where("idProveedor", "==", idProveedor)
        .get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  /**
   * Obtiene un servicio por su ID, validando que pertenezca al proveedor.
   * @param {string} id - ID del servicio.
   * @param {string} idProveedor - ID del proveedor.
   * @return {Promise<Object>} Datos del servicio.
   * @throws {Error} Si el servicio no se encuentra o no pertenece al proveedor.
   */
  static async getById(id, idProveedor) {
    const doc = await db.collection(SERVICIOS_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Servicio no encontrado");
    }

    const servicio = doc.data();
    if (servicio.idProveedor !== idProveedor) {
      throw new Error("No tienes permiso para ver este servicio.");
    }

    return {id: doc.id, ...servicio};
  }

  /**
   * Actualiza un servicio por su ID, validando que pertenezca al proveedor.
   * @param {string} id - ID del servicio.
   * @param {string} idProveedor - ID del proveedor.
   * @param {Object} data - Datos a actualizar.
   * @return {Promise<Object>} Datos actualizados del servicio.
   */
  static async updateById(id, idProveedor, data) {
    const docRef = db.collection(SERVICIOS_COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Servicio no encontrado.");
    }

    const servicio = doc.data();
    if (servicio.idProveedor !== idProveedor) {
      throw new Error("No tienes permiso para modificar este servicio.");
    }

    await docRef.update(data);
    return {id, ...data};
  }

  /**
   * Elimina un servicio por su ID, validando que pertenezca al proveedor.
   * @param {string} id - ID del servicio.
   * @param {string} idProveedor - ID del proveedor.
   * @return {Promise<Object>} Mensaje de eliminación.
   */
  static async deleteById(id, idProveedor) {
    const docRef = db.collection(SERVICIOS_COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Servicio no encontrado.");
    }

    const servicio = doc.data();
    if (servicio.idProveedor !== idProveedor) {
      throw new Error("No tienes permiso para eliminar este servicio.");
    }

    await docRef.delete();
    return {id, mensaje: "Servicio eliminado correctamente"};
  }
}

module.exports = ServicioModel;
