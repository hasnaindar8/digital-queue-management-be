const { format } = require("node-pg-format");
const db = require("../connection");

const seed = ({ reasonData, userData }) => {
  return db
    .query(
      `DROP TABLE IF EXISTS queue;
        DROP TABLE IF EXISTS reasons;
        DROP TABLE IF EXISTS users;`
    )
    .then(() => {
      return db.query(
        `CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        surname VARCHAR(255),
        email VARCHAR(20),
        phone_no VARCHAR(20),
        password VARCHAR(20),
        type VARCHAR(20),
        reg_status BOOL
        );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE reasons(
        description VARCHAR(255) PRIMARY KEY,
        est_wait INT
        );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE queue(
        queue_entry_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        reason VARCHAR(255) REFERENCES reasons(description)
        );`
      );
    })
    .then(() => {
      const nestedArrOfUsers = userData.map((user) => {
        return [
          user.first_name,
          user.surname,
          user.email,
          user.phone_no,
          user.password,
          user.type,
          user.registered,
        ];
      });
      const usersInsertStr = format(
        `INSERT INTO users (first_name, surname, email, phone_no, password, type, reg_status)
        VALUES %L`,
        nestedArrOfUsers
      );
      return db.query(usersInsertStr);
    })
    .then(() => {
      const nestedArrOfReasons = reasonData.map((reason) => {
        return [reason.description, reason.estimated_wait];
      });
      const reasonsInsertStr = format(
        `INSERT INTO reasons (description, est_wait)
        VALUES %L`,
        nestedArrOfReasons
      );
      return db.query(reasonsInsertStr);
    })
 };

module.exports = seed;
