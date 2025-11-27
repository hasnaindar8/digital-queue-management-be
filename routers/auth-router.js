const {
  registerUser,
  getUserByEmail,
} = require("../controllers/auth.controller.js");
const express = require("express");
const authRouter = express.Router();

authRouter.route("/signup").post(registerUser);

authRouter.route("/login").post(getUserByEmail);

module.exports = authRouter;
