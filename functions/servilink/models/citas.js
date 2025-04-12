const admin = require("firebase-admin");
const db = admin.firestore();

const CITAS_COLLECTION = "citas_servilink";

/**
 * Clase para representar una Cita de servicio.
 */
class Cita {
  /**
   * Constructor de la clase Cita.
   * Se admite `fechaRealizacion` para construir fecha y hora si es necesario.
   * @param {string} idUsuario - ID del usuario que agenda la cita.
   * @param {string} idProveedor - ID del proveedor del servicio.
   * @param {string} idServicio - ID del servicio seleccionado.
   * @param {string} fechaCita - Fecha de la cita (YYYY-MM-DD).
   * @param {string} horaCita - Hora de la cita (HH:mm).
   * @param {string} estado - Estado de la cita.
   * @param {string} fechaRealizacion - (opcional) ISO string para descomponer
   */
  constructor(
      idUsuario,
      idProveedor,
      idServicio,
      fechaCita,
      horaCita,
      estado = "Pendiente",
      fechaRealizacion = null,
  ) {
    // Si se proporciona fechaRealizacion, la descompone
    if (fechaRealizacion) {
      const fecha = new Date(fechaRealizacion);
      this.fechaCita = fecha.toISOString().split("T")[0];
      this.horaCita = fecha.toTimeString().substring(0, 5);
    } else {
      this.fechaCita = fechaCita;
      this.horaCita = horaCita;
    }

    this.idUsuario = idUsuario;
    this.idProveedor = idProveedor;
    this.idServicio = idServicio;
    this.estado = estado;
  }


  /**
   * Guarda una nueva cita en Firestore.
   * @return {Promise<string>} ID de la cita guardada.
   */
  async save() {
    const citaRef = db.collection(CITAS_COLLECTION).doc();
    const idCita = citaRef.id;

    await citaRef.set({
      idCita: idCita,
      idUsuario: this.idUsuario,
      idProveedor: this.idProveedor,
      idServicio: this.idServicio,
      fechaCita: this.fechaCita,
      horaCita: this.horaCita,
      estado: this.estado,
    });

    return idCita;
  }

  /**
   * Obtiene todas las citas de la colección.
   * @return {Promise<Object[]>} Lista de citas.
   */
  static async getAll() {
    const snapshot = await db.collection(CITAS_COLLECTION).get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
   * Obtiene una cita por su ID.
   * @param {string} id - ID de la cita.
   * @return {Promise<Object>} Datos de la cita.
   */
  static async getById(id) {
    const doc = await db.collection(CITAS_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Cita no encontrada");
    }
    return {id: doc.id, ...doc.data()};
  }

  /**
   * Obtiene todas las citas de un usuario.
   * @param {string} idUsuario - ID del usuario.
   * @return {Promise<Object[]>} Lista de citas del usuario.
   */
  static async getByUsuario(idUsuario) {
    const snapshot = await db.collection(CITAS_COLLECTION)
        .where("idUsuario", "==", idUsuario)
        .get();

    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
   * Obtiene todas las citas de un proveedor.
   * @param {string} idProveedor - ID del proveedor.
   * @return {Promise<Object[]>} Lista de citas del proveedor.
   */
  static async getByProveedor(idProveedor) {
    const snapshot = await db.collection(CITAS_COLLECTION)
        .where("idProveedor", "==", idProveedor)
        .get();

    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }
}

module.exports = Cita;
