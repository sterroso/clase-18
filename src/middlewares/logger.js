import winston from "winston";
import constants from "../config/app.constants.js";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: constants.logging.levels.console }),
    new winston.transports.File({
      filename: constants.logging.paths.file,
      level: constants.logging.levels.file,
    }),
  ],
});

export default (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `[${new Date().toLocaleString("es-MX", {
      dateStyle: "short",
      timeStyle: "medium",
    })}] ${req.method} @ ${req.path}`
  );
  next();
};
