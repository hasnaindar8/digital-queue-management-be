const { removeServedPatient } = require("../controllers/queue.controllers.js");
const express = require("express");
const authRouter = express.Router();

authRouter.route("/:entry_id").delete(removeServedPatient);

module.exports = authRouter;
