const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('authToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING(120), allowNull: false, unique: true }
}, { tableName: 'auth_token', timestamps: true });
