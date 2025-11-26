const db = require("../db/connection");

function readReasons() {
  return db.query(
    `SELECT 
        reason_id,
        label 
    FROM reasons;
    `).then(({ rows }) => {
      console.log(rows)
    return rows;
  });
}

module.exports = { readReasons };
