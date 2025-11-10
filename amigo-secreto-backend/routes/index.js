const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/sorteos', require('./sorteo.routes'));  // <— privado
router.use('/public', require('./public.routes'));   // <— público (hash)
router.get('/health', (req,res)=>res.json({ ok:true }));

module.exports = router;
