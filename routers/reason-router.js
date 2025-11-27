const { getReasons } = require("../controllers/reason.controller.js");
const express = require("express");
const reasonRouter = express.Router();

reasonRouter.route("/").get(getReasons);

module.exports = reasonRouter;
