const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('accessLink', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: { type: DataTypes.ENUM('sorteo','bolillo'), allowNull: false },
  hash: { type: DataTypes.STRING(80), allowNull: false, unique: true },
  idSorteo: { type: DataTypes.INTEGER, allowNull: true },
  idParticipante: { type: DataTypes.INTEGER, allowNull: true },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'access_link', timestamps: true });
