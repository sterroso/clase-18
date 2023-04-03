import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

try {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URI);
} catch (error) {
  console.group("🍃 MongoDB Error❗");
  console.error("🍃 MongoDB could not be connected 🤷‍♂️");
  console.error(error);
  console.groupEnd();
}

mongoose.connection.on("error", (error) => {
  console.group("🍃 MongoDB Error❗");
  console.error(error);
  console.groupEnd();
});

mongoose.connection.on("connecting", () => {
  console.info("🍃 MongoDB Connecting ...");
});

mongoose.connection.on("connected", () => {
  console.info("🍃 MongoDB Connected! 👍");
});

mongoose.connection.on("disconnecting", () => {
  console.info("🍃 MongoDB Disconnecting ...");
});

mongoose.connection.on("disconnected", () => {
  console.info("🍃 MongoDB Disconnected 🧑‍🔧");
});

mongoose.connection.on("reconnected", () => {
  console.info("🍃 MongoDB Reconnected 🦾");
});
