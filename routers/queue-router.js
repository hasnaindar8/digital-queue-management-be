const { removePatient } = require("../controllers/queue.controllers.js");
const express = require("express");
const authRouter = express.Router();

authRouter.route("/:entry_id/:user_id").delete(removePatient);

module.exports = authRouter;
