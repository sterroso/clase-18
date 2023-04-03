// Imports (libraries)
import e from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";

import constants from "./src/config/app.constants.js";

dotenv.config();

// Imports (modules)
import UserRouter from "./src/routes/user.router.js";
import "./src/config/app.config.js";

// Create Express app
const app = e();

// App middlewares
app.use(e.urlencoded({ extended: true }));
app.use(e.json());
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: true,
  })
);
app.use(
  cors({
    origin: constants.cors.allowedOrigins,
    methods: constants.cors.allowedMethods,
  })
);

// App routes
app.use("/api/users", UserRouter);

// Export app
export default app;
