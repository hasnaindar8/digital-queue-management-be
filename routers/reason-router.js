const { getReasons } = require("../controllers/reason.controller.js");
const express = require("express");
const reasonRouter = express.Router();

reasonRouter.route("/reasons").get(getReasons);

module.exports = reasonRouter;
