const Joi = require('joi');

const participanteSchema = Joi.object({
  nombre: Joi.string().min(1).max(120).required()
});

const participanteOptionalSchema = Joi.object({
  nombre: Joi.string().min(1).max(120).optional()
});

const wishlistSchema = Joi.object({
  wishlist: Joi.string().allow('').max(5000).required()
});

module.exports = { participanteSchema, participanteOptionalSchema, wishlistSchema };
