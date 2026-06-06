const ApiError = require("../errors/apiError");
const mongoose = require("mongoose");

function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      status: "error",
      message: "Invalid ID format.",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      status: "error",
      message: "Duplicate key error.",
    });
  }

  console.error(err);
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}

module.exports = errorHandler;
