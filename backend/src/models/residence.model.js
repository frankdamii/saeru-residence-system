const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Residence = sequelize.define('Residence', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { tableName: 'residences', timestamps: false });

module.exports = Residence;