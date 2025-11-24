const format = require("node-pg-format");
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
        est_wait INTERVAL
        );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE queue(
        position SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        reason VARCHAR(255) REFERENCES reasons(description)
        );`
      );
    })
    .then(() => {
      console.log(reasonData);
    });
};

module.exports = seed;
