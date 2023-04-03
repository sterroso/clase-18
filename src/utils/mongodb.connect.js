import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "./logger.js";

dotenv.config();

try {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URI);
} catch (error) {
  logger.error("🍃 MongoDB Error❗");
  logger.error("🍃 MongoDB could not be connected 🤷‍♂️");
  logger.error(error);
}

mongoose.connection.on("error", (error) => {
  logger.error("🍃 MongoDB Error❗");
  logger.error(error);
});

mongoose.connection.on("connecting", () => {
  logger.info("🍃 MongoDB Connecting ...");
});

mongoose.connection.on("connected", () => {
  logger.info("🍃 MongoDB Connected! 👍");
});

mongoose.connection.on("disconnecting", () => {
  logger.warn("🍃 MongoDB Disconnecting ...");
});

mongoose.connection.on("disconnected", () => {
  logger.warn("🍃 MongoDB Disconnected 🧑‍🔧");
});

mongoose.connection.on("reconnected", () => {
  logger.info("🍃 MongoDB Reconnected 🦾");
});
