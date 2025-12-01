const db = require("../db/connection.js");

function deleteQueueEntry(userId) {
  return db
    .query(`DELETE FROM queue_entries WHERE user_id = $1;`, [userId])
    .then(({ rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: `No entry found to delete with user_id: ${userId}`,
        });
      }
      return rowCount;
    });
}

function insertQueueEntry(userId, reasonId) {
  return db.query(
    `INSERT INTO queue_entries (user_id, reason_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO NOTHING;`,
    [userId, reasonId]
  );
}

function getQueueEntries() {
  return db
    .query(
      `SELECT queue_entries.user_id, reasons.est_wait from queue_entries JOIN reasons ON queue_entries.reason_id=reasons.reason_id ORDER BY queue_entries.created_at ASC;`
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { deleteQueueEntry, insertQueueEntry, getQueueEntries };
