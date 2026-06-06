const ApiError = require("../errors/apiError");

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      for (const key of Object.keys(schema)) {
        if (!schema[key]) continue;
        const value = await schema[key].validateAsync(req[key]);
        req[key] = value;
      }

      next();
    } catch (err) {
      return next(
        ApiError.BadRequest(
          err && err.details && err.details[0] ? err.details[0].message : err.message
        )
      );
    }
  };
};

module.exports = {
  validate,
};
