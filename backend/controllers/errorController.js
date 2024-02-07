const ApiError = require("./../utils/ApiError");

const handleUniqueConstraintError = (err) => {
  const message = `Duplicate field value: ${err.errors[0].value}. Please use another value!`;
  return new ApiError(message, 400);
};

const handleValidationError = (err) => {
  // const errors = Object.values(err.errors).map((el) => el.message);
  const errors = err.errors.map((error) => error.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new ApiError(message, 400);
};

const handleSequelizeDataTruncation = (err) => {
  return new ApiError(
    `Invalid input data: ${err.parent.parameters[0]}. Please provide a valid input`,
    400
  );
};

const handleJWTError = () =>
  new ApiError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new ApiError("Your token has expired! Please log in again.", 401);

const handleMulterFileSizeLimitError = () =>
  new ApiError(
    `File size should be less than ${process.env.MAX_FILE_SIZE_IN_MB}`,
    400
  );

const sendErrorDev = (err, req, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorProd = (err, req, res) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // B) Programming or other unknown error: don't leak error details
  console.error("ERROR 💥", err);
  // Send generic message
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.code === "LIMIT_FILE_SIZE") err = handleMulterFileSizeLimitError();

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (
      error.name === "SequelizeUniqueConstraintError" &&
      error.parent.code === "ER_DUP_ENTRY"
    )
      error = handleUniqueConstraintError(error);
    if (error.name === "SequelizeValidationError")
      error = handleValidationError(error);
    if (
      error.name === "SequelizeDatabaseError" &&
      error.parent.code === "WARN_DATA_TRUNCATED"
    )
      error = handleSequelizeDataTruncation(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
