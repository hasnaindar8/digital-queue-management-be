const db = require("../db/connection");

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

function getQueueEntries() {
  return db
    .query(
      `SELECT queue_entries.user_id, reasons.est_wait from queue_entries JOIN reasons ON queue_entries.reason_id=reasons.reason_id ORDER BY queue_entries.created_at ASC;`
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { deleteQueueEntry, getQueueEntries };
