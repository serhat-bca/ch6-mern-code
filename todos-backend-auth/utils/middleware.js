const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.log(`Request Method: ${req.method}`);
  logger.log(`Request URL: ${req.url}`);
  logger.log("Request body:", req.body);
  logger.log("------------");
  next();
};

// middleware for error handling
const errorHandler = (error, req, res, next) => {
  logger.error("error message: ", error.message);
  if (error.name === "CastError") {
    return res.status(400).json({ error: "invalid id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = { requestLogger, errorHandler };
