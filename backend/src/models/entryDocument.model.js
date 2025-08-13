const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const EntryDocument = sequelize.define('EntryDocument', {
  application_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  enrollment_proof_url: { type: DataTypes.STRING, allowNull: false },
  entry_slip_url: { type: DataTypes.STRING, allowNull: false },
  payment_receipt_url: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'entry_documents', createdAt: 'created_at', updatedAt: false });

module.exports = EntryDocument;