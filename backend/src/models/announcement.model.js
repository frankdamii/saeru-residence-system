const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Announcement = sequelize.define('Announcement', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'announcements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Announcement;