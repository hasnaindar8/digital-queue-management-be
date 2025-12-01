const db = require("../db/connection.js");

function readListOfQueuePatient() {
  return db.query(`SELECT queue_entries.entry_id, queue_entries.user_id, users.first_name, users.surname, users.phone_no, reasons.label, reasons.est_wait FROM queue_entries
  left join users on users.user_id = queue_entries.user_id
  left join reasons on reasons.reason_id = queue_entries.reason_id order by entry_id asc`);
}

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

module.exports = { readListOfQueuePatient, deleteQueueEntry, insertQueueEntry };
