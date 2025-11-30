const db = require("../db/connection.js");

function deleteQueueEntry(entryId) {
  return db
    .query(`DELETE FROM queue_entries WHERE entry_id = $1;`, [entryId])
    .then(({ rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: `No entry found to delete with entry_id: ${entryId}`,
        });
      }
      return rowCount;
    });
}

function insertQueueEntry(userId, reasonId) {
  return db
    .query(
      `INSERT INTO queue_entries (user_id, reason_id)
        VALUES ($1, $2)
        RETURNING user_id, reason_id;`,
      [userId, reasonId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = { deleteQueueEntry, insertQueueEntry };
