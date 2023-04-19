import * as Joi from 'joi';

export const chatSchema = Joi.object().keys({
  user: Joi.string().min(1).max(100).required(),
  message: Joi.string().min(1).max(1000).required(),
  lang: Joi.string().length(2).default('es'),
});
