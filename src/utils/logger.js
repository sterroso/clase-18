import constants from "../config/app.constants.js";
import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: "warn",
      filename: constants.logging.paths.server,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      ),
    }),
  ],
});

export default logger;
