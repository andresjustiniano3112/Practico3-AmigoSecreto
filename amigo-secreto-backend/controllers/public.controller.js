const db = require('../models');
const { generateHash } = require('../utilities/text.utilities');

exports.verPendientes = async (req, res) => {
  const link = req.accessLink; // tipo 'sorteo'
  const pendientes = await db.participante.findAll({
    where: { idSorteo: link.idSorteo, identificado: false },
    order: [['id', 'ASC']]
  });
  res.json(pendientes);
};

exports.identificar = async (req, res) => {
  const link = req.accessLink; // 'sorteo'
  const { idParticipante } = req.body;

  const p = await db.participante.findOne({
    where: { id: idParticipante, idSorteo: link.idSorteo }
  });
  if (!p) return res.status(404).json({ error: 'Participante no encontrado' });
  if (p.identificado) return res.status(400).json({ error: 'Ya identificado' });

  await p.update({ identificado: true });

  
  let bolillo = await db.accessLink.findOne({
    where: { tipo: 'bolillo', idParticipante: p.id, idSorteo: link.idSorteo, activo: true }
  });

  if (!bolillo) {
    const h = generateHash();
    bolillo = await db.accessLink.create({
      tipo: 'bolillo',
      hash: h,
      idParticipante: p.id,
      idSorteo: link.idSorteo
    });
  }

  res.json({ bolilloHash: bolillo.hash, urlBolillo: `/public/bolillo/${bolillo.hash}` });
};

exports.verBolillo = async (req, res) => {
  const link = req.accessLink; // 'bolillo'
  const yo = await db.participante.findByPk(link.idParticipante);
  if (!yo) return res.status(404).json({ error: 'No encontrado' });

  const asign = await db.asignacion.findOne({
    where: { idSorteo: link.idSorteo, idDador: yo.id }
  });
  const receptor = asign ? await db.participante.findByPk(asign.idReceptor) : null;

  res.json({
    yo: { id: yo.id, nombre: yo.nombre, wishlist: yo.wishlist || '' },
    receptor: receptor ? { id: receptor.id, nombre: receptor.nombre, wishlist: receptor.wishlist || '' } : null
  });
};

exports.guardarWishlist = async (req, res) => {
  const link = req.accessLink; // 'bolillo'
  const { wishlist } = req.body;
  const yo = await db.participante.findByPk(link.idParticipante);
  if (!yo) return res.status(404).json({ error: 'No encontrado' });
  await yo.update({ wishlist });
  res.json({ ok: true });
};
