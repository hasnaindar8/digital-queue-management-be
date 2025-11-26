const { registerUser } = require("../controllers/auth.controller.js");
const express = require("express");
const authRouter = express.Router();

authRouter.route("/signup").post(registerUser);

module.exports = authRouter;
