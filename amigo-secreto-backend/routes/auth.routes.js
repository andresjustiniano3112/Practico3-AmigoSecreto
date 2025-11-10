const router = require('express').Router();
const validateJson = require('../middlewares/validation.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const { registerSchema, loginSchema } = require('../validators/authSchema');
const controller = require('../controllers/auth.controller');

router.post('/register', isJsonRequestValid, validateJson(registerSchema), controller.register);
router.post('/login',    isJsonRequestValid, validateJson(loginSchema),    controller.login);

module.exports = router;
