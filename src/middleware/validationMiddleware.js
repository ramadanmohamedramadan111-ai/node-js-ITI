const ApiError = require("../errors/apiError");

const validate = (schema) => (req, res, next) => {
  if (schema.params) {
    const { error, value } = schema.params.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return next(
        ApiError.BadRequest(error.details.map((detail) => detail.message).join(", "))
      );
    }

    req.params = value;
  }

  if (schema.query) {
    const { error, value } = schema.query.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return next(
        ApiError.BadRequest(error.details.map((detail) => detail.message).join(", "))
      );
    }

    req.query = value;
  }

  if (schema.body) {
    const { error, value } = schema.body.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return next(
        ApiError.BadRequest(error.details.map((detail) => detail.message).join(", "))
      );
    }

    req.body = value;
  }

  next();
};

module.exports = {
  validate,
};
