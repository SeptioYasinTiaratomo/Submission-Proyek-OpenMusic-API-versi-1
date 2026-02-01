const Joi = require('joi');

const albumSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': '"name" harus berupa teks',
    'string.empty': '"name" tidak boleh kosong',
    'any.required': '"name" wajib diisi',
  }),
  year: Joi.number().integer().required().messages({
    'number.base': '"year" harus berupa angka',
    'any.required': '"year" wajib diisi',
  }),
});

module.exports = { albumSchema };
