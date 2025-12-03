const db = require("../db/connection.js");

function insertUser(requestBody) {
  const { firstName, surname, email, phoneNumber, password } = requestBody;
  if (
    typeof firstName !== "string" ||
    firstName.length === 0 ||
    typeof surname !== "string" ||
    surname.length === 0 ||
    typeof email !== "string" ||
    email.length === 0 ||
    typeof phoneNumber !== "string" ||
    phoneNumber.length === 0 ||
    typeof password !== "string" ||
    password.length === 0
  ) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  const type = "patient";
  const registrationStatus = false;
  return db.query(
    `INSERT INTO users
        (first_name, surname,
         email, phone_no, password,
          type, reg_status) VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [firstName, surname, email, phoneNumber, password, type, registrationStatus]
  );
}

function findUserByEmail(email, password) {
  return db.query(
    `Select user_id, first_name, surname, type, reg_status from users where email = $1 and password = $2`,
    [email, password]
  );
}

module.exports = { insertUser, findUserByEmail };
