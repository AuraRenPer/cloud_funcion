const admin = require("firebase-admin");
const db = admin.firestore();
const bcrypt = require("bcryptjs");

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
   * @param {string} username - Nombre de usuario del usuario.
   * @param {string} telefono - Número de teléfono del usuario.
   * @param {string} fechaLogin - Fecha de registro del usuario.
   * @param {string} rol - Rol del usuario (cliente/proveedor/admin).
   * @param {string} estatus - Estado del usuario (activo/inactivo).
   */
  constructor(
      nombre,
      apellido,
      correo,
      password,
      username,
      telefono,
      fechaLogin,
      rol,
      estatus,
  ) {
    console.log("Contraseña recibida en constructor:", password);

    // Verificamos que la contraseña no venga encriptada desde el frontend
    if (password && !password.startsWith("$2a$10$")) {
      this.password = bcrypt.hashSync(password, 10);
    } else {
      this.password = password; // Ya está encriptada
    }

    console.log("Contraseña encriptada:", this.password);

    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.username = username;
    this.telefono = telefono;
    this.fechaLogin = fechaLogin;
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
      username: this.username,
      telefono: this.telefono,
      fechaLogin: this.fechaLogin,
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


  /**
   * Obtener usuario por correo o username.
   * @param {string} login - Correo o username del usuario.
   * @return {Promise<Object>} Datos del usuario.
   */
  static async getByCorreoOrUsername(login) {
    let snapshot;

    // Intentamos buscar por correo
    snapshot = await db.collection(USUARIOS_COLLECTION)
        .where("correo", "==", login)
        .limit(1)
        .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return {id: doc.id, ...doc.data()};
    }

    // Si no encontramos por correo, buscamos por username
    snapshot = await db.collection(USUARIOS_COLLECTION)
        .where("username", "==", login)
        .limit(1)
        .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return {id: doc.id, ...doc.data()};
    }

    return null;
  }
}

static async getByCorreo(correo) {
  console.log("Buscando usuario con correo:", correo);
  const snapshot = await db.collection(USUARIOS_COLLECTION)
    .where("correo", "==", correo)
    .limit(1)
    .get();

  console.log("Snapshot correo empty?", snapshot.empty);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    console.log("Usuario con correo encontrado:", doc.data());
    return { id: doc.id, ...doc.data() };
  }

  return null;
}

static async getByUsername(username) {
  console.log("Buscando usuario con username:", username);
  const snapshot = await db.collection(USUARIOS_COLLECTION)
    .where("username", "==", username)
    .limit(1)
    .get();

  console.log("Snapshot username empty?", snapshot.empty);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    console.log("Usuario con username encontrado:", doc.data());
    return { id: doc.id, ...doc.data() };
  }

  return null;
}

module.exports = Usuario;
