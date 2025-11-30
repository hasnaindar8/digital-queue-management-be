const { insertQueueEntry } = require("../models/queue.model.js");

function addQueueEntry(req, res) {
  const { user_id, reason_id } = req.body;

  if (typeof user_id !== "number" || typeof reason_id !== "number") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return insertQueueEntry(user_id, reason_id).then((entry) => {
    res.status(201).send({ queueEntry: entry });
  });
}

module.exports = { addQueueEntry };
