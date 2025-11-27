const { insertUser, findUserByEmail } = require("../models/auth.model.js");

function registerUser(req, res) {
  const requestBody = req.body;
  return insertUser(requestBody).then(() => {
    res.status(201).send();
  });
}

const getUserByEmail = (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    email.length === 0 ||
    typeof password !== "string" ||
    password.length === 0
  ) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return findUserByEmail(email, password).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No user found for email: ${email}`,
      });
    }

    if (!rows[0]["reg_status"]) {
      return Promise.reject({
        status: 401,
        msg: "Registration process pending",
      });
    }

    const user = {
      userId: rows[0]["user_id"],
      firstName: rows[0]["first_name"],
      surname: rows[0]["surname"],
      type: rows[0]["type"],
    };
    res.status(200).send({ user });
  });
};

module.exports = { registerUser, getUserByEmail };
