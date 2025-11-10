module.exports = (req, res, next) => {
  if (['POST','PUT','PATCH'].includes(req.method)) {
    if (!req.is('application/json')) {
      return res.status(400).json({ error: 'Content-Type debe ser application/json' });
    }
  }
  next();
};
