const admin = require("firebase-admin");
const db = admin.firestore();

const USUARIOS_COLLECTION = "users";

/**
 * Clase para representar un Usuario.
 */
class Usuario {
  /**
   * Constructor de la clase Usuario.
   * @param {string} nombre - Nombre del usuario.
   * @param {string} apellido - Apellido del usuario.
   * @param {string} correo - Correo electrónico del usuario.
   * @param {string} password - password encriptada del usuario.
   * @param {string} telefono - Número de teléfono del usuario.
   * @param {string} fechaRegistro - Fecha de registro del usuario.
   * @param {string} rol - Rol del usuario (cliente/proveedor/admin).
   * @param {string} estatus - Estado del usuario (activo/inactivo).
   */
  constructor(
      nombre,
      apellido,
      correo,
      password,
      telefono,
      fechaRegistro,
      rol,
      estatus,
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.password = password;
    this.telefono = telefono;
    this.fechaRegistro = fechaRegistro;
    this.rol = rol;
    this.estatus = estatus;
  }

  /**
   * Guarda un nuevo usuario en Firestore.
   * @return {Promise<string>} ID del usuario guardado.
   */
  async save() {
    const usuarioRef = db.collection(USUARIOS_COLLECTION).doc();
    await usuarioRef.set({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      password: this.password,
      telefono: this.telefono,
      fechaRegistro: this.fechaRegistro,
      rol: this.rol,
      estatus: this.estatus,
    });
    return usuarioRef.id;
  }

  /**
   * Obtiene todos los usuarios de la colección.
   * @return {Promise<Object[]>} Lista de usuarios.
   */
  static async getAll() {
    const snapshot = await db.collection(USUARIOS_COLLECTION).get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {string} id - ID del usuario.
   * @return {Promise<Object>} Datos del usuario.
   * @throws {Error} Si el usuario no se encuentra.
   */
  static async getById(id) {
    const doc = await db.collection(USUARIOS_COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new Error("Usuario no encontrado");
    }
    return {id: doc.id, ...doc.data()};
  }

  /**
   * Actualiza un usuario por su ID.
   * @param {string} id - ID del usuario.
   * @param {Object} data - Datos a actualizar.
   * @return {Promise<Object>} Datos actualizados del usuario.
   */
  static async updateById(id, data) {
    await db.collection(USUARIOS_COLLECTION).doc(id).update(data);
    return {id, ...data};
  }

  /**
   * Elimina un usuario por su ID.
   * @param {string} id - ID del usuario.
   * @return {Promise<Object>} Mensaje de eliminación.
   */
  static async deleteById(id) {
    await db.collection(USUARIOS_COLLECTION).doc(id).delete();
    return {id, mensaje: "Usuario eliminado correctamente"};
  }
}

module.exports = Usuario;
