/**
 * Middleware para verificar si el usuario tiene uno de los roles permitidos.
 * Requiere que el authMiddleware se haya ejecutado antes para poblar req.user.
 * 
 * @param {Array<number>} allowedRoles - Arreglo con los IDs de los roles permitidos.
 */
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.rol_id) {
      return res.status(403).json({ 
        message: "Acceso denegado. No se encontró información del rol del usuario." 
      });
    }

    if (allowedRoles.includes(req.user.rol_id)) {
      next();
    } else {
      return res.status(403).json({ 
        message: "Acceso denegado. No tienes los permisos necesarios para realizar esta acción." 
      });
    }
  };
};

// Exportamos las constantes de los 7 roles para que sea más fácil de leer en las rutas
const ROLES = {
  ESTUDIANTE: 1,
  CATEDRATICO: 2,
  ADMINISTRADOR: 3,
  COORDINADOR_SEDE: 4,
  COORDINADOR_GENERAL: 5,
  COORDINADOR_TESIS: 6,
  REVISOR: 7
};

module.exports = {
  checkRole,
  ROLES
};
