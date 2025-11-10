const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(64).required(),
  nombreCompleto: Joi.string().min(1).max(120).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(64).required()
});

module.exports = { registerSchema, loginSchema };
