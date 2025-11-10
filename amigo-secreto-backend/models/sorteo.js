const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('sorteo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  nombre: { type: DataTypes.STRING(120), allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  iniciado: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'sorteo', timestamps: true });
