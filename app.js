const express = require("express");
const { createServer } = require("node:http");
const app = express();
const cors = require("cors");
const { notFoundHandler } = require("./middleware/notFoundHandler");
const {
  customErrorHandler,
  psqlErrorHandler,
  serverErrorHandler,
} = require("./middleware/errorHandler");
const { removeServedPatient } = require("./controllers/queue.controllers");

app.use(cors());

app.use(express.json());

app.delete("/api/queue_entries/:entry_id", removeServedPatient);

app.use(notFoundHandler);

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(serverErrorHandler);

//test

module.exports = app;
