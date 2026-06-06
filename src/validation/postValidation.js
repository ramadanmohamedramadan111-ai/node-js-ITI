const Joi = require("joi");

const createPost = {
  body: Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().required(),
    userId: Joi.string().hex().length(24).required(),
  }),
};

const updatePost = {
  body: Joi.object({
    title: Joi.string().min(3),
    content: Joi.string(),
    userId: Joi.string().hex().length(24),
  }),
};

const objectIdParam = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  createPost,
  updatePost,
  objectIdParam,
};