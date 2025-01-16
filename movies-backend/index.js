const app = require("./app");
const config = require("./utils/config");
const port = config.port;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
