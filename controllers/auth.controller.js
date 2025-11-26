const { insertUser } = require("../models/auth.model.js");

function registerUser(req, res) {
  const requestBody = req.body;
  return insertUser(requestBody).then(() => {
    res.status(201).send();
  });
}

module.exports = { registerUser };
