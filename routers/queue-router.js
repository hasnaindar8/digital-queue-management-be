const {
  removePatient,
  addQueueEntry,
} = require("../controllers/queue.controller.js");
const express = require("express");
const queueRouter = express.Router();

queueRouter.route("/:entry_id/:user_id").delete(removePatient);

queueRouter.route("/join").post(addQueueEntry);

module.exports = queueRouter;
