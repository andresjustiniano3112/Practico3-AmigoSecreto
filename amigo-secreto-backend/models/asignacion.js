const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('asignacion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idSorteo: { type: DataTypes.INTEGER, allowNull: false },
  idDador: { type: DataTypes.INTEGER, allowNull: false },
  idReceptor: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'asignacion', timestamps: true });
