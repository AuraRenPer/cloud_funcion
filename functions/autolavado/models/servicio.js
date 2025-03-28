const admin = require("firebase-admin");
const db = admin.firestore();

const SERVICIOS_COLLECTION = "servicios";

/**
 * Clase para representar un Servicio.
 */
class Servicio {
  /**
   * Constructor de la clase Servicio.
   * @param {string} nombre - Nombre del servicio.
   * @param {string} descripcionProblema - Descripción del problema.
   * @param {number} precio - Precio del servicio.
   * @param {string} duracion - Duración estimada del servicio.
   * @param {string} imagen - URL de la imagen del servicio.
   * @param {string} tipoServicio
   * - Tipo de servicio (Lavado Express, Lavado Premium).
   * @param {string} idProveedor
   * - ID del proveedor que ofrece el servicio.
   * @param {Object|null} ubicacionPersona
   *  - Ubicación de la persona si el servicio es a domicilio.
   * @param {number} ubicacionPersona.lat - Latitud geográfica (opcional).
   * @param {number} ubicacionPersona.lng - Longitud geográfica (opcional).
   * @param {string} ubicacionPersona.direccion - Dirección completa (opcional).
   */
  constructor(
      nombre,
      descripcionProblema,
      precio,
      duracion,
      imagen,
      tipoServicio,
      idProveedor,
      ubicacionPersona = null,
  ) {
    this.nombre = nombre;
    this.descripcionProblema = descripcionProblema;
    this.precio = precio;
    this.duracion = duracion;
    this.imagen = imagen;
    this.tipoServicio = tipoServicio;
    this.idProveedor = idProveedor;
    this.ubicacionPersona = ubicacionPersona;
  }

  /**
   * Guarda un nuevo servicio
   * @return {Promise<string>} ID del servicio guardado.
   */
  async save() {
    const servicioRef = db.collection(SERVICIOS_COLLECTION).doc();
    const idServicio = servicioRef.id;

    await servicioRef.set({
      idServicio: idServicio, // 🔹 Guardamos el ID en Firestore
      nombre: this.nombre,
      descripcionProblema: this.descripcionProblema,
      precio: this.precio,
      duracion: this.duracion,
      imagen: this.imagen,
      tipoServicio: this.tipoServicio,
      idProveedor: this.idProveedor,
      ubicacionPersona: this.ubicacionPersona,
    });

    return idServicio;
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
   */
  static async getById(id) {
    const doc = await db.collection(SERVICIOS_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Servicio no encontrado");
    }
    return {id: doc.id, ...doc.data()};
  }

  /**
   * Obtiene todos los servicios de un proveedor.
   * @param {string} idProveedor - ID del proveedor.
   * @return {Promise<Object[]>} Lista de servicios del proveedor.
   */
  static async getByProveedor(idProveedor) {
    if (!idProveedor) {
      throw new Error("El ID del proveedor es requerido.");
    }
    const snapshot = await db.collection(SERVICIOS_COLLECTION)
        .where("idProveedor", "==", idProveedor)
        .get();
    if (snapshot.empty) {
      return []; // Devolver array vacío en lugar de lanzar error
    }

    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
   * Actualiza un servicio por su ID.
   * @param {string} id - ID del servicio.
   * @param {Object} data - Datos a actualizar.
   * @return {Promise<Object>} Datos actualizados del servicio.
   */
  static async updateById(id, data) {
    const servicioRef = db.collection(SERVICIOS_COLLECTION).doc(id);
    const doc = await servicioRef.get();

    if (!doc.exists) {
      throw new Error("Servicio no encontrado");
    }

    await servicioRef.update(data);
    return {id, ...data};
  }

  /**
   * Elimina un servicio por su ID.
   * @param {string} id - ID del servicio.
   * @return {Promise<Object>} Mensaje de eliminación.
   */
  static async deleteById(id) {
    const servicioRef = db.collection(SERVICIOS_COLLECTION).doc(id);
    const doc = await servicioRef.get();

    if (!doc.exists) {
      throw new Error("Servicio no encontrado");
    }

    await servicioRef.delete();
    return {id, mensaje: "Servicio eliminado correctamente"};
  }
}

module.exports = Servicio;
