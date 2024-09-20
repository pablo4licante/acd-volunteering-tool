const jwt = require('jsonwebtoken');

// Clave secreta utilizada para firmar y verificar el token. Debe mantenerse segura.
const secretKey = 'tu_clave_secreta'; // Reemplaza con tu clave secreta real

// Middleware para verificar el token JWT
function authenticateToken(req, res, next) {
  // Obtener el token de los encabezados de la solicitud
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  // Si no hay token, responder con un error de autenticación
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado.' });
  }

  // Verificar y decodificar el token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // Si el token es inválido o ha expirado, responder con un error de autenticación
      return res.status(403).json({ error: 'Token inválido.' });
    }

    // Si el token es válido, guardar la información del usuario en la solicitud
    req.userEmail = decoded.email; // Extraer el email del usuario

    // Pasar al siguiente middleware o ruta
    next();
  });
}

// Exportar el middleware para usarlo en otras partes del código
module.exports = authenticateToken;
