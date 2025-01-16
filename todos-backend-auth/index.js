const app = require("./app");
const config = require("./utils/config");
const port = config.port;
const logger = require("./utils/logger");

app.listen(port, () => {
  logger.log(`Server is running on port ${port}`);
});
