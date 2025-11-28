const { format } = require("node-pg-format");
const db = require("../connection");
const { createLookupObject } = require("../seeds/utils.js");

const seed = ({ reasonData, userData, queueData }) => {
  return db
    .query(
      `DROP TABLE IF EXISTS queue_entries;
        DROP TABLE IF EXISTS reasons;
        DROP TABLE IF EXISTS users;`
    )
    .then(() => {
      return db.query(
        `CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        surname VARCHAR(255),
        email VARCHAR(50) UNIQUE,
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
        reason_id SERIAL PRIMARY KEY,
        label VARCHAR(255),
        est_wait INT
        );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE queue_entries(
        entry_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        reason_id INT REFERENCES reasons(reason_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
      );
    })
    .then(() => {
      const userFormattedData = userData.map((user) => {
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
      const insertUsersQuery = format(
        `INSERT INTO users (first_name, surname, email, phone_no, password, type, reg_status)
        VALUES %L RETURNING user_id, email`,
        userFormattedData
      );
      return db.query(insertUsersQuery);
    })
    .then((insertUsersResponse) => {
      const usersLookup = createLookupObject(
        insertUsersResponse.rows,
        "email",
        "user_id"
      );
      const reasonFormattedData = reasonData.map((reason) => {
        return [reason.label, reason.estimated_wait];
      });
      const insertReasonsQuery = format(
        `INSERT INTO reasons (label, est_wait)
        VALUES %L RETURNING reason_id, label`,
        reasonFormattedData
      );

      return Promise.all([db.query(insertReasonsQuery), usersLookup]);
    })
    .then(([insertReasonsResponse, usersLookup]) => {
      const reasonsLookup = createLookupObject(
        insertReasonsResponse.rows,
        "label",
        "reason_id"
      );
      const queueFormattedData = queueData.map((entry) => {
        return [usersLookup[entry.email], reasonsLookup[entry.reason]];
      });
      const insertQueueQuery = format(
        `INSERT INTO queue_entries (user_id, reason_id)
        VALUES %L`,
        queueFormattedData
      );

      return db.query(insertQueueQuery);
    });
};

module.exports = seed;
