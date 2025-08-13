
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  // El 'id' se crea automáticamente
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('student', 'admin'),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'users', // Le decimos a Sequelize el nombre exacto de la tabla
  timestamps: true, // Usa `created_at` y `updated_at`
  createdAt: 'created_at',
  updatedAt: false, // No tenemos `updated_at` en nuestra tabla
});

module.exports = User;