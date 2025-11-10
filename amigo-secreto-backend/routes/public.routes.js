const router = require('express').Router();
const validateAccessLink = require('../middlewares/validateAccessLink.middleware');
const validateJson = require('../middlewares/validation.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const { identificarSchema } = require('../validators/publicSchema');
const { wishlistSchema } = require('../validators/participanteSchema');
const controller = require('../controllers/public.controller');

// Link del sorteo (lista pendientes, identificar)
router.get('/sorteos/:hash', validateAccessLink('sorteo'), controller.verPendientes);
router.post('/sorteos/:hash/identificar', isJsonRequestValid, validateAccessLink('sorteo'), validateJson(identificarSchema), controller.identificar);

// Link “bolillo” (ver mi info + wishlist receptor, guardar mi wishlist)
router.get('/bolillo/:hash', validateAccessLink('bolillo'), controller.verBolillo);
router.post('/bolillo/:hash/wishlist', isJsonRequestValid, validateAccessLink('bolillo'), validateJson(wishlistSchema), controller.guardarWishlist);

module.exports = router;
