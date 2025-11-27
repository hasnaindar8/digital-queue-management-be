const { insertQueueEntry } = require("../models/queue.model.js");

function addQueueEntry(req, res) {
  const { user_id, reason_id } = req.body;

  if (typeof user_id === "number" && typeof reason_id === "number") {
    return insertQueueEntry(user_id, reason_id).then((entry) => {
      res.status(201).send({ queue_entry: entry });
    });
  } else {
    return Promise.reject({ status: 400, msg: "You have made a bad request" });
  }
}

module.exports = { addQueueEntry };
