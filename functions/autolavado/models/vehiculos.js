const admin = require("firebase-admin");
const db = admin.firestore();

const VEHICULOS_COLLECTION = "vehiculos";

/**
 * Clase para representar un Vehículo.
 */
class Vehiculo {
  /**
   * Constructor de la clase Vehiculo.
   * @param {string} idUsuario - ID del usuario dueño del vehículo.
   * @param {string} marca - Marca del vehículo.
   * @param {string} modelo - Modelo del vehículo.
   * @param {number} year - Año del vehículo.
   * @param {string} placa - Placa del vehículo.
   * @param {string} color - Color del vehículo.
   */
  constructor(idUsuario, marca, modelo, year, placa, color) {
    this.idUsuario = idUsuario;
    this.marca = marca;
    this.modelo = modelo;
    this.year = year;
    this.placa = placa;
    this.color = color;
  }

  /**
   * Guarda un nuevo vehículo en Firestore.
   * @return {Promise<string>} ID del vehículo guardado.
   */
  async save() {
    const vehiculoRef = db.collection(VEHICULOS_COLLECTION).doc();
    await vehiculoRef.set({
      idUsuario: this.idUsuario,
      marca: this.marca,
      modelo: this.modelo,
      year: this.year,
      placa: this.placa,
      color: this.color,
    });
    return vehiculoRef.id;
  }

  /**
   * Obtiene todos los vehículos de la colección.
   * @return {Promise<Object[]>} Lista de vehículos.
   */
  static async getAll() {
    const snapshot = await db.collection(VEHICULOS_COLLECTION).get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
   * Obtiene un vehículo por su ID.
   * @param {string} id - ID del vehículo.
   * @return {Promise<Object>} Datos del vehículo.
   * @throws {Error} Si el vehículo no se encuentra.
   */
  static async getById(id) {
    const doc = await db.collection(VEHICULOS_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Vehículo no encontrado");
    }
    return {id: doc.id, ...doc.data()};
  }

  /**
   * Actualiza un vehículo por su ID.
   * @param {string} id - ID del vehículo.
   * @param {Object} data - Datos a actualizar.
   * @return {Promise<Object>} Datos actualizados del vehículo.
   */
  static async updateById(id, data) {
    await db.collection(VEHICULOS_COLLECTION).doc(id).update(data);
    return {id, ...data};
  }

  /**
   * Elimina un vehículo por su ID.
   * @param {string} id - ID del vehículo.
   * @return {Promise<Object>} Mensaje de eliminación.
   */
  static async deleteById(id) {
    await db.collection(VEHICULOS_COLLECTION).doc(id).delete();
    return {id, mensaje: "Vehículo eliminado correctamente"};
  }
}

module.exports = Vehiculo;
