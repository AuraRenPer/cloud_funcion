const admin = require("firebase-admin");
const db = admin.firestore();

const CATEGORIAS_COLLECTION = "categorias_servilink";

/**
 * Clase para manejar las categorías en Firestore.
 */
class Categoria {
  /**
   * Constructor de la clase Categoria.
   * @param {string} nombre - Nombre de la categoría.
   * @param {string} descripcion - Descripción de la categoría.
   * @param {string} estatus - Estado de la categoría ("activo" o "inactivo").
   */
  constructor(nombre, descripcion, estatus = "activo") {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estatus = estatus;
  }

  /**
   * Guarda una nueva categoría en la base de datos.
   * @return {Promise<string>} ID de la categoría guardada.
   */
  async save() {
    const categoriaRef = db.collection(CATEGORIAS_COLLECTION).doc();
    const idCategoria = categoriaRef.id;

    await categoriaRef.set({
      idCategoria: idCategoria,
      nombre: this.nombre,
      descripcion: this.descripcion,
      estatus: this.estatus,
    });

    return idCategoria;
  }

  /**
   * Obtiene todas las categorías activas.
   * @return {Promise<Object[]>} Lista de categorías activas.
   */
  static async getAll() {
    const snapshot = await db.collection(CATEGORIAS_COLLECTION)
        .where("estatus", "==", "activo").get();

    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
   * Obtiene una categoría por su ID.
   * @param {string} id - ID de la categoría.
   * @return {Promise<Object|null>} Datos de la categoría o `null` si no existe.
   */
  static async getById(id) {
    const doc = await db.collection(CATEGORIAS_COLLECTION).doc(id).get();
    return doc.exists ? {id: doc.id, ...doc.data()} : null;
  }

  /**
   * Actualiza una categoría por su ID.
   * @param {string} id - ID de la categoría.
   * @param {Object} data - Datos a actualizar.
   * @return {Promise<Object>} Datos actualizados de la categoría.
   */
  static async updateById(id, data) {
    const categoriaRef = db.collection(CATEGORIAS_COLLECTION).doc(id);
    await categoriaRef.update(data);
    return {id, ...data};
  }

  /**
   * Elimina una categoría por su ID.
   * @param {string} id - ID de la categoría.
   * @return {Promise<Object>} Mensaje de eliminación.
   */
  static async deleteById(id) {
    await db.collection(CATEGORIAS_COLLECTION).doc(id).delete();
    return {id, mensaje: "Categoría eliminada correctamente"};
  }
}

module.exports = Categoria;
