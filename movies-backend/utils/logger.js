const log = (...messages) => {
  console.log("[LOG] ", ...messages);
};

const error = (...messages) => {
  console.error("[ERROR] ", ...messages);
};

const debug = (...messages) => {
  console.log("[DEBUG] ", ...messages);
};

module.exports = { log, error, debug };
