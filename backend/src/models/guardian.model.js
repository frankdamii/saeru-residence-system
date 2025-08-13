const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Guardian = sequelize.define('Guardian', {
  student_profile_id: { type: DataTypes.INTEGER, allowNull: false },
  guardian_type: { type: DataTypes.ENUM('Padre', 'Madre', 'Tutor', 'Tutor Eventual'), allowNull: false },
  full_name: { type: DataTypes.STRING, allowNull: false },
  relationship: { type: DataTypes.STRING },
  occupation: { type: DataTypes.STRING },
  phone_number: { type: DataTypes.STRING, allowNull: false },
  residence: { type: DataTypes.STRING }
}, { tableName: 'guardians', timestamps: false });

module.exports = Guardian;