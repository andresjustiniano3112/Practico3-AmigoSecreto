const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('participante', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idSorteo: { type: DataTypes.INTEGER, allowNull: false },
  nombre: { type: DataTypes.STRING(120), allowNull: false },
  identificado: { type: DataTypes.BOOLEAN, defaultValue: false },
  wishlist: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'participante', timestamps: true });
