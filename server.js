import app from "./app.js";
import constants from "./src/config/app.constants.js";

const port = constants.port || 3000;

const server = app.listen(port, (error) => {
  if (error) {
    console.error("🏃 Server could not be started❗");
    console.error(error);
  }

  console.info(`🏃 Server listening on port ${port} 🚀`);
});

server.on("error", (error) => {
  console.error("🏃 Server error❗");
  console.error(error);
});
