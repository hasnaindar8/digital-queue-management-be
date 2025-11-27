const db = require("../db/connection");

function fetchReasons() {
  return db
    .query(
      `SELECT 
        reason_id,
        label 
    FROM reasons;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { fetchReasons };
