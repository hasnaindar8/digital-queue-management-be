const db = require("../db/connection");

function deleteQueueEntry(entry_id) {
  return db.query(`DELETE FROM queue_entries WHERE entry_id = $1;`, [entry_id])
    .then(({ rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rowCount;
    });
};

module.exports = { deleteQueueEntry };