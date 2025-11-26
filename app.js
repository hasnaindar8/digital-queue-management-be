const {
  customErrorHandler,
  psqlErrorHandler,
  serverErrorHandler,
} = require("./middleware/errorHandler.js");
const { notFoundHandler } = require("./middleware/notFoundHandler.js");
const authRouter = require("./routers/auth-router.js");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);

app.use(notFoundHandler);

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(serverErrorHandler);

module.exports = app;
