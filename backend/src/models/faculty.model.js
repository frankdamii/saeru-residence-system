const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Faculty = sequelize.define('Faculty', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { tableName: 'faculties', timestamps: false });

module.exports = Faculty;