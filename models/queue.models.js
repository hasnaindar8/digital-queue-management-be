const db = require("../db/connection");

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

module.exports = { readListOfQueuePatient, deleteQueueEntry };
