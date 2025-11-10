const db = require('../models');
module.exports = (tipo) => async (req, res, next) => {
  const { hash } = req.params;
  const link = await db.accessLink.findOne({ where: { tipo, hash, activo: true } });
  if (!link) return res.status(401).json({ error: 'Link inválido' });
  req.accessLink = link;
  next();
};
