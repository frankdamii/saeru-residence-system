const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

    if (!token) {
      return res.status(403).json({ message: 'No se proporcionó un token.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'No autorizado. Token inválido.' });
      }
      req.user = decoded;
      next();
    });
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }
  }
};
