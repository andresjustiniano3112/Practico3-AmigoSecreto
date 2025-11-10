const router = require('express').Router();
const db = require('../models');

const validateUser = require('../middlewares/validateUser.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const validateJson = require('../middlewares/validation.middleware');
const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');

const { sorteoSchema, sorteoOptionalSchema } = require('../validators/sorteoSchema');
const { participanteSchema } = require('../validators/participanteSchema');
const controller = require('../controllers/sorteo.controller');

// Todas privadas
router.use(validateUser);

// CRUD sorteo
router.get('/', controller.listMine);
router.post('/', isJsonRequestValid, validateJson(sorteoSchema), controller.create);
router.put('/:id', isJsonRequestValid, validateJson(sorteoOptionalSchema), getObjectOr404(db.sorteo), controller.update);
router.delete('/:id', getObjectOr404(db.sorteo), controller.remove);

// Participantes
router.get('/:id/participantes', controller.listParticipantes);
router.post('/:id/participantes', isJsonRequestValid, validateJson(participanteSchema), controller.addParticipante);

// Ejecutar sorteo
router.post('/:id/sortear', controller.sortear);

module.exports = router;
