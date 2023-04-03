import app from "./app.js";
import constants from "./src/config/app.constants.js";
import logger from "./src/utils/logger.js";

const port = constants.port || 3000;

const server = app.listen(port, (error) => {
  if (error) {
    logger.error("🏃 Server could not be started❗");
    logger.error(error);
  }

  logger.info(`🏃 Server listening on port ${port} 🚀`);
});

server.on("error", (error) => {
  logger.error("🏃 Server error❗");
  logger.error(error);
});
