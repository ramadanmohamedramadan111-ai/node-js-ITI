const Joi = require("joi");

const createUser = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),

    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "user").required(),
  }),
};

const updateUser = {
  body: Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.string().valid("admin", "user"),
  }),
};

const objectIdParam = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  createUser,
  updateUser,
  objectIdParam,
};