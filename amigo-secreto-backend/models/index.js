const { sequelize } = require('../config/db.config');

const usuario = require('./usuario')(sequelize);
const authToken = require('./authToken')(sequelize);

const sorteo = require('./sorteo')(sequelize);
const participante = require('./participante')(sequelize);
const asignacion = require('./asignacion')(sequelize);
const accessLink = require('./accessLink')(sequelize);

// Relaciones
authToken.belongsTo(usuario, { foreignKey: 'idUsuario', as: 'usuario' });
usuario.hasMany(authToken, { foreignKey: 'idUsuario', as: 'tokens' });

sorteo.belongsTo(usuario, { foreignKey: 'idUsuario', as: 'owner' });
usuario.hasMany(sorteo, { foreignKey: 'idUsuario', as: 'sorteos' });

participante.belongsTo(sorteo, { foreignKey: 'idSorteo', as: 'sorteo' });
sorteo.hasMany(participante, { foreignKey: 'idSorteo', as: 'participantes' });

asignacion.belongsTo(sorteo, { foreignKey: 'idSorteo', as: 'sorteo' });
asignacion.belongsTo(participante, { foreignKey: 'idDador', as: 'dador' });
asignacion.belongsTo(participante, { foreignKey: 'idReceptor', as: 'receptor' });

accessLink.belongsTo(sorteo, { foreignKey: 'idSorteo', as: 'sorteo' });
accessLink.belongsTo(participante, { foreignKey: 'idParticipante', as: 'participante' });

module.exports = {
  usuario, authToken,
  sorteo, participante, asignacion, accessLink,
  sequelize, Sequelize: sequelize.Sequelize
};
