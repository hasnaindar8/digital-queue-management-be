const {
  removeQueueEntry,
  addQueueEntry,
} = require("../controllers/queue.controller.js");
const express = require("express");
const queueRouter = express.Router();

queueRouter.route("/:user_id").delete(removeQueueEntry);

queueRouter.route("/join").post(addQueueEntry);

module.exports = queueRouter;
