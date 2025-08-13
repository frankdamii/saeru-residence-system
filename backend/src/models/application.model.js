const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Application = sequelize.define('Application', {
  student_profile_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  academic_year: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected', 'waitlist'), defaultValue: 'pending' },
  submission_date: { type: DataTypes.DATE, allowNull: false },
  assigned_habitation_id: { type: DataTypes.INTEGER },
  record_number: { type: DataTypes.STRING, unique: true },
  admin_notes: { type: DataTypes.TEXT }
}, { tableName: 'applications', createdAt: 'created_at', updatedAt: false });

module.exports = Application;