const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Major = sequelize.define('Major', {
  faculty_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { tableName: 'majors', timestamps: false });

module.exports = Major;