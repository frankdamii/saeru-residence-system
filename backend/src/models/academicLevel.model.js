const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const AcademicLevel = sequelize.define('AcademicLevel', {
  level_name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { tableName: 'academic_levels', timestamps: false });

module.exports = AcademicLevel;