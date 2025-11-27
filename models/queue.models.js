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

module.exports = { deleteQueueEntry };
