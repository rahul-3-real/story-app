class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message || "Something went wrong";
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Response structure
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: err.message || "Internal Server Error",
    errors: err.errors || null,
  });
};

export default ApiError;
