const { insertUser, readUserByEmail } = require("../models/auth.model.js");

function registerUser(req, res) {
  const requestBody = req.body;
  return insertUser(requestBody).then(() => {
    res.status(201).send();
  });
}

const getUserByEmail = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return readUserByEmail(email, password).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "User does not exist" });
    } else {
      res.status(200).send({ user_type: rows[0].type });
    }
  });
};

module.exports = { registerUser, getUserByEmail };
