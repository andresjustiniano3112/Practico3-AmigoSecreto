const Joi = require('joi');

const sorteoSchema = Joi.object({
  nombre: Joi.string().min(1).max(120).required(),
  fecha: Joi.date().required()
});

const sorteoOptionalSchema = Joi.object({
  nombre: Joi.string().min(1).max(120).optional(),
  fecha: Joi.date().optional()
});

module.exports = { sorteoSchema, sorteoOptionalSchema };
