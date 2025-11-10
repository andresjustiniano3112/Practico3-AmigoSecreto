const { Sequelize } = require('sequelize');

// SQLite local (sin logs para limpiar consola)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('DB OK (SQLite)'))
  .catch(err => console.error('DB error:', err));

module.exports = { sequelize, Sequelize };
