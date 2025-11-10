const db = require('../models');
const { Op } = require('sequelize');
const { generateHash } = require('../utilities/text.utilities');

const makeDerangement = (arr) => {
  let b = [...arr];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === b[i]) {
      const swap = (i + 1) % arr.length;
      [b[i], b[swap]] = [b[swap], b[i]];
    }
  }
  return b;
};

exports.listMine = async (req, res) => {
  const rows = await db.sorteo.findAll({
    where: { idUsuario: req.user.id },
    order: [['createdAt', 'DESC']]
  });
  res.json(rows);
};

exports.create = async (req, res) => {
  const row = await db.sorteo.create({
    idUsuario: req.user.id,
    nombre: req.body.nombre,
    fecha: req.body.fecha,
    iniciado: false
  });
  res.status(201).json(row);
};

exports.update = async (req, res) => {
  const s = req.entity;
  if (s.idUsuario !== req.user.id) return res.status(403).json({ error: 'Prohibido' });
  if (s.iniciado) return res.status(400).json({ error: 'Sorteo ya iniciado' });
  await s.update(req.body);
  res.json(s);
};

exports.remove = async (req, res) => {
  const s = req.entity;
  if (s.idUsuario !== req.user.id) return res.status(403).json({ error: 'Prohibido' });
  if (s.iniciado) return res.status(400).json({ error: 'Sorteo ya iniciado' });
  await db.participante.destroy({ where: { idSorteo: s.id } });
  await db.asignacion.destroy({ where: { idSorteo: s.id } });
  await db.accessLink.destroy({ where: { idSorteo: s.id } });
  await s.destroy();
  res.status(204).end();
};

exports.addParticipante = async (req, res) => {
  const s = await db.sorteo.findByPk(req.params.id);
  if (!s || s.idUsuario !== req.user.id) return res.status(404).json({ error: 'No encontrado' });
  if (s.iniciado) return res.status(400).json({ error: 'Sorteo ya iniciado' });
  const p = await db.participante.create({ idSorteo: s.id, nombre: req.body.nombre });
  res.status(201).json(p);
};

exports.listParticipantes = async (req, res) => {
  const s = await db.sorteo.findByPk(req.params.id);
  if (!s || s.idUsuario !== req.user.id) return res.status(404).json({ error: 'No encontrado' });

  const rows = await db.participante.findAll({
    where: { idSorteo: s.id },
    order: [['id', 'ASC']]
  });
  res.json(rows);
};

exports.sortear = async (req, res) => {
  const s = await db.sorteo.findByPk(req.params.id, {
    include: [{ model: db.participante, as: 'participantes' }]
  });
  if (!s || s.idUsuario !== req.user.id) return res.status(404).json({ error: 'No encontrado' });
  if (s.iniciado) return res.status(400).json({ error: 'Ya iniciado' });

  const parts = s.participantes || [];
  if (parts.length < 2) return res.status(400).json({ error: 'Se necesitan al menos 2 participantes' });

  const ids = parts.map(p => p.id);
  const receivers = makeDerangement(ids);

  for (let i = 0; i < ids.length; i++) {
    await db.asignacion.create({ idSorteo: s.id, idDador: ids[i], idReceptor: receivers[i] });
  }

  const sorteoHash = generateHash();
  await db.accessLink.create({ tipo: 'sorteo', hash: sorteoHash, idSorteo: s.id });

  await s.update({ iniciado: true });

  res.json({
    sorteoHash,
    urlSorteo: `/public/sorteos/${sorteoHash}`
  });
};
