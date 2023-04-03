import appConstanst from "./app.constants.js";
if (appConstanst.hasMongo) {
  const importFrom = "../utils/mongodb.connect.js";
  await import(importFrom);
}
