require("dotenv").config();

const config = {
  dbUri: process.env.MONGODB_URI,
  port: process.env.PORT,
};

module.exports = config;
