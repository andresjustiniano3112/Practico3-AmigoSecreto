const db = require('../models');

module.exports = async (req, res, next) => {
  const bearer = req.headers['authorization'];
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = bearer.substring(7);
  const tokenRow = await db.authToken.findOne({ where: { token } });
  if (!tokenRow) return res.status(401).json({ error: 'Unauthorized' });
  const user = await db.usuario.findByPk(tokenRow.idUsuario);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  req.user = user;
  next();
};
