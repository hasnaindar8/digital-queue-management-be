const {
  readListOfQueuePatient,
  deleteQueueEntry,
} = require("../models/queue.models");

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

module.exports = { getListOfQueuePatient, removePatient };
