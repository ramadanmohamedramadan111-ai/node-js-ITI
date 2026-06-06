class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  static BadRequest(message = "Bad Request") {
    return new ApiError(400, message);
  }

  static NotFound(message = "Not Found") {
    return new ApiError(404, message);
  }

  static Conflict(message = "Conflict") {
    return new ApiError(409, message);
  }

  static Internal(message = "Internal Server Error") {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
