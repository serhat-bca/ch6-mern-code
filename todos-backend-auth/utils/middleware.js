const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.log(`Request Method: ${req.method}`);
  logger.log(`Request URL: ${req.url}`);
  const modifiedBody = req.body.password
    ? { ...req.body, password: "******" }
    : req.body;
  logger.log("Request body:", modifiedBody);
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
  } else if (error.name === "MongoServerError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: error.message });
  }
  next(error);
};

module.exports = { requestLogger, errorHandler };
