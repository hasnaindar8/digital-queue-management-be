const express = require("express");
const { createServer } = require("node:http");
const app = express();
const cors = require("cors");
const queueRouter = require("./routers/queue-router.js");
const { notFoundHandler } = require("./middleware/notFoundHandler");
const {
  customErrorHandler,
  psqlErrorHandler,
  serverErrorHandler,
} = require("./middleware/errorHandler");

app.use(cors());

app.use(express.json());

app.use("/api/queue_entries", queueRouter);

app.use(notFoundHandler);

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(serverErrorHandler);

module.exports = app;
