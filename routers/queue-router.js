const { addQueueEntry } = require("../controllers/queue.controller.js");
const express = require("express");
const queueRouter = express.Router();

queueRouter.route("/").post(addQueueEntry);

module.exports = queueRouter;
