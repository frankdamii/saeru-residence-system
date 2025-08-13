const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    if (!user.is_active) {
        return res.status(403).json({ message: 'Esta cuenta ha sido desactivada.' });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor.', error: error.message });
  }
};

// Exportamos un objeto con todas las funciones del controlador
module.exports = {
    login,
};
