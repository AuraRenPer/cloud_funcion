const admin = require("firebase-admin");
const db = admin.firestore();

const PROVEEDORES_COLLECTION = "proveedores";

/**
 * Clase para representar un Proveedor.
 */
class Proveedor {
  /**
   * Constructor de la clase Proveedor.
   * @param {string} nombreEmpresa - Nombre del proveedor.
   * @param {string} correo - Correo del proveedor.
   * @param {string} telefono - Teléfono del proveedor.
   * @param {Object} ubicacion
   * - Ubicación del proveedor con latitud, longitud y dirección.
   * @param {number} ubicacion.lat - Latitud geográfica.
   * @param {number} ubicacion.lng - Longitud geográfica.
   * @param {string} ubicacion.direccion
   *  - Dirección completa del proveedor.
   * @param {string} horarioServicio - Horario de atención.
   * @param {Array<string>} serviciosDisponibles - Lista de IDs de servicios.
   * @param {string} estado - Estado del proveedor (activo/inactivo).
   * @param {string} idUsuario - ID del usuario vinculado.
   *
  */
  constructor(
      nombreEmpresa,
      correo,
      telefono,
      ubicacion,
      horarioServicio,
      serviciosDisponibles,
      estado,
      idUsuario,
  ) {
    this.nombreEmpresa = nombreEmpresa;
    this.correo = correo;
    this.telefono = telefono;
    this.ubicacion = ubicacion;
    this.horarioServicio = horarioServicio;
    this.serviciosDisponibles = serviciosDisponibles || [];
    this.estado = estado;
    this.idUsuario = idUsuario;
  }

  /**
   * Guarda un nuevo proveedor en Firestore.
   * @return {Promise<string>} ID del proveedor guardado.
   */
  async save() {
    const proveedorRef = db.collection(
        PROVEEDORES_COLLECTION,
    ).doc();

    await proveedorRef.set({
      nombreEmpresa: this.nombreEmpresa,
      correo: this.correo,
      telefono: this.telefono,
      ubicacion: this.ubicacion,
      horarioServicio: this.horarioServicio,
      serviciosDisponibles: this.serviciosDisponibles,
      estado: this.estado,
      idUsuario: this.idUsuario,
    });
    return proveedorRef.id;
  }

  /**
   * Obtiene todos los proveedores.
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
   */
  static async getById(id) {
    const doc = await db.collection(PROVEEDORES_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Proveedor no encontrado");
    }
    return {id: doc.id, ...doc.data()};
  }

  /**
   * Obtiene proveedores por categoría.
   * @param {string} idCategoria - ID de la categoría.
   * @return {Promise<Object[]>} Lista de proveedores en esa categoría.
   */
  static async getByCategoria(idCategoria) {
    const snapshot = await db.collection(PROVEEDORES_COLLECTION)
        .where("idCategoria", "==", idCategoria)
        .get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
   * Actualiza un proveedor por su ID.
   * @param {string} id - ID del proveedor.
   * @param {Object} data - Datos a actualizar.
   * @return {Promise<Object>} Datos actualizados.
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

  /**
   * Elimina un proveedor por su ID.
   * @param {string} idProveedor - ID del proveedor.
   * @param {string} idServicio - ID del idServicio.
   * @return {Promise<Object>} Mensaje de eliminación.
   */
  static async agregarServicioAProveedor(idProveedor, idServicio) {
    const proveedorRef = db.collection(PROVEEDORES_COLLECTION).doc(idProveedor);
    await proveedorRef.update({
      serviciosDisponibles: admin.firestore.FieldValue.arrayUnion(idServicio),
    });
  }
}

module.exports = Proveedor;
