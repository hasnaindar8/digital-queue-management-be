const db = require("../db/connection.js");

function insertQueueEntry(user_id, reason_id) {
  return db
    .query(
      `INSERT INTO queue_entries (user_id, reason_id)
        VALUES ($1, $2)
        RETURNING *;`,
      [user_id, reason_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = { insertQueueEntry };
