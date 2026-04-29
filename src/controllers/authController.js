const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// Import Objection models
const User = require("../models/User");
const Year = require("../models/Year");
const { logActivity } = require("../helpers/appLog");
const { sendEmailPasswordRecovery } = require("../services/emailService");

/**
 * registerUser
 */
const registerUser = async (req, res) => {
  let { email, password, name, carnet, sede_id, rol_id, year } = req.body;

  if (sede_id === "" || sede_id === "null" || sede_id === "undefined") {
    sede_id = null;
  }

  if (!email || !password || !name || !carnet || !rol_id || !year) {
    return res.status(400).json({
      message: "Faltan campos requeridos. Por favor, proporcione todos los datos necesarios.",
    });
  }

  if (sede_id !== null && sede_id !== undefined && sede_id !== "" && (isNaN(sede_id) || sede_id <= 0)) {
    return res.status(400).json({ message: "sede_id debe ser un número válido mayor a 0 o null." });
  }

  if (isNaN(rol_id) || rol_id <= 0) {
    return res.status(400).json({ message: "rol_id debe ser un número válido mayor a 0." });
  }

  if (isNaN(year) || year <= 0) {
    return res.status(400).json({ message: "year debe ser un número válido mayor a 0." });
  }

  try {
    const currentYear = new Date().getFullYear();

    if (year > currentYear) {
      return res.status(400).json({
        message: `No se puede crear un año mayor al actual (${currentYear}).`,
      });
    }

    // findOrCreate Year
    let yearRecord = await Year.query().findOne({ year: year });
    if (!yearRecord) {
      yearRecord = await Year.query().insert({ year: year });
    }

    let user = await User.query().findOne({ email });

    if (user) {
      return res.status(400).json({
        message: `Ya existe un usuario registrado con el correo electrónico ${email}.`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.query().insert({
      email,
      password: hashedPassword,
      name,
      carnet,
      sede_id,
      rol_id,
      year_id: yearRecord.year_id,
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
    });
  } catch (err) {
    console.error("Error en el registro de usuario:", err);
    res.status(500).json({
      message: "Error en el servidor. Por favor, intente más tarde.",
      error: err.message,
    });
  }
};

/**
 * loginUser
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.query().findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.active == false || user.active === 0) {
      return res.status(401).json({ message: "Acceso denegado. El usuario está deshabilitado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña inválida" });
    }

    const token = jwt.sign(
      {
        user: {
          user_id: user.user_id,
          rol_id: user.rol_id,
          sede_id: user.sede_id,
        },
      },
      process.env.JWT_SECRET || 'secretkey_placeholder',
      { expiresIn: "1h" }
    );

    if (user.rol_id === 1) {
      await logActivity(
        user.user_id,
        user.sede_id,
        `El usuario inició sesión`,
        "Inicio de sesión"
      );
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      id: user.user_id,
      sede: user.sede_id,
      rol: user.rol_id,
      passwordUpdate: user.passwordUpdate,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * updatePassword
 */
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user_id = req.user?.user_id;

    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Se requieren la contraseña actual y la nueva contraseña",
      });
    }

    const user = await User.query().findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "La contraseña actual es incorrecta" });
    }

    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(400).json({
        message: "La nueva contraseña no puede ser igual a la actual",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await user.$query().patch({ password: hashedNewPassword, passwordUpdate: true });

    await logActivity(
      user_id,
      user.sede_id,
      "El usuario actualizó su contraseña",
      "Actualización de contraseña"
    );

    return res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (err) {
    console.error("Error al actualizar la contraseña:", err);
    return res.status(500).json({
      message: "Error en el servidor",
      error: err.message,
    });
  }
};

/**
 * updateProfilePhoto
 */
const updateProfilePhoto = async (req, res) => {
  const user_id = req.user ? req.user.user_id : null;
  const profilePhoto = req.file ? req.file.filename : null;

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!profilePhoto) {
    return res.status(400).json({ message: "No se proporcionó una nueva foto de perfil" });
  }

  try {
    const user = await User.query().findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.profilePhoto) {
      const oldImagePath = path.join(__dirname, "../../public/profilephoto", user.profilePhoto);

      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.log(`Error al eliminar la foto anterior: ${err.message}`);
          } else {
            console.log("Foto de perfil anterior eliminada correctamente");
          }
        });
      }
    }

    await User.query().patchAndFetchById(user_id, { profilePhoto: profilePhoto });

    await logActivity(
      user_id,
      user.sede_id,
      `El usuario actualizó su foto de perfil`,
      "Actualización de foto de perfil"
    );

    res.json({ message: "Foto de perfil actualizada exitosamente" });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};

/**
 * requestPasswordRecovery
 */
const requestPasswordRecovery = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Por favor, proporcione un correo electrónico." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Correo electrónico no válido." });
    }

    const user = await User.query().findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No se encontró un usuario con ese correo electrónico." });
    }
    
    const newPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.$query().patch({ password: hashedPassword });

    await sendEmailPasswordRecovery(
      "Recuperación de contraseña",
      `Tu nueva contraseña es: ${newPassword}`,
      email,
      { nombre: user.name, newPassword }
    );

    return res.status(200).json({
      message: "Tu nueva contraseña ha sido enviada a tu correo electrónico.",
    });
  } catch (error) {
    console.error("Error al solicitar la recuperación de la contraseña:", error);
    return res.status(500).json({
      message: "Error en el servidor. Por favor, intenta nuevamente más tarde.",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
  updateProfilePhoto,
  requestPasswordRecovery,
};
