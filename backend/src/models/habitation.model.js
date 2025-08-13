const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Habitation = sequelize.define('Habitation', {
  residence_id: { type: DataTypes.INTEGER, allowNull: false },
  habitation_code: { type: DataTypes.STRING, allowNull: false, unique: true },
  floor: { type: DataTypes.INTEGER, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  status: { type: DataTypes.ENUM('available', 'occupied', 'maintenance'), defaultValue: 'available' }
}, { tableName: 'habitations', timestamps: false });

module.exports = Habitation;
