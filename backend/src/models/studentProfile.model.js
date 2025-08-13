const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const StudentProfile = sequelize.define('StudentProfile', {
  user_id: { type: DataTypes.INTEGER, unique: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  date_of_birth: { type: DataTypes.DATE, allowNull: false },
  identity_document_type: { type: DataTypes.ENUM('D.I.P.', 'Pasaporte'), allowNull: false },
  identity_document_number: { type: DataTypes.STRING, allowNull: false },
  phone_number: { type: DataTypes.STRING, allowNull: false },
  home_residence: { type: DataTypes.STRING, allowNull: false },
  faculty_id: { type: DataTypes.INTEGER, allowNull: false },
  major_id: { type: DataTypes.INTEGER, allowNull: false },
  academic_level_id: { type: DataTypes.INTEGER, allowNull: false },
  profile_image_url: { type: DataTypes.STRING, allowNull: false },
  instagram_handle: { type: DataTypes.STRING },
  medical_issues: { type: DataTypes.TEXT },
  harmful_habits: { type: DataTypes.TEXT },
  observations: { type: DataTypes.TEXT }
}, { tableName: 'student_profiles', createdAt: 'created_at', updatedAt: false });

module.exports = StudentProfile;