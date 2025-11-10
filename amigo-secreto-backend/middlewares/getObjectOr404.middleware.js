module.exports = (Model) => async (req, res, next) => {
  const { id } = req.params;
  const obj = await Model.findByPk(id);
  if (!obj) return res.status(404).json({ error: 'No encontrado' });
  req.entity = obj;
  next();
};
