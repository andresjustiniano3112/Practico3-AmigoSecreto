const Joi = require('joi');

const identificarSchema = Joi.object({
  idParticipante: Joi.number().integer().required()
});

module.exports = { identificarSchema };
