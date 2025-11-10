const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(120), allowNull: false },
  nombreCompleto: { type: DataTypes.STRING(120), allowNull: false }
}, { tableName: 'usuario', timestamps: true });
