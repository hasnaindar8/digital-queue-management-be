const {
  customErrorHandler,
  psqlErrorHandler,
  serverErrorHandler,
} = require("./middleware/errorHandler.js");
const { notFoundHandler } = require("./middleware/notFoundHandler.js");

const authRouter = require("./routers/auth-router.js");
const reasonRouter = require("./routers/reason-router.js");
const queueRouter = require("./routers/queue-router.js");

const socketService = require("./services/socketService.js");

const express = require("express");
const app = express();
const cors = require("cors");
const { createServer } = require("node:http");
const server = createServer(app);

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

const io = socketService.initialize(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/reasons", reasonRouter);

app.use("/api/auth", authRouter);

app.use("/api/queue", queueRouter);

app.use(notFoundHandler);

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(serverErrorHandler);

module.exports = { app, server };
