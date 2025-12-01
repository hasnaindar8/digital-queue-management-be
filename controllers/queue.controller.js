const {
  readListOfQueuePatient,
  deleteQueueEntry,
  insertQueueEntry,
} = require("../models/queue.model.js");

const getListOfQueuePatient = (req, res) => {
  return readListOfQueuePatient().then(({ rows }) => {
    res.status(200).send({ queue: rows });
  });
};

function removePatient(req, res) {
  const { entry_id } = req.params;
  return deleteQueueEntry(entry_id).then(() => {
    res.status(204).send();
  });
}

function addQueueEntry(req, res) {
  const { user_id, reason_id } = req.body;

  if (typeof user_id !== "number" || typeof reason_id !== "number") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return insertQueueEntry(user_id, reason_id).then((entry) => {
    res.status(201).send({ queueEntry: entry });
  });
}

module.exports = { getListOfQueuePatient, removePatient, addQueueEntry };
