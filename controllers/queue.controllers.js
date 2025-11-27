const { deleteQueueEntry } = require("../models/queue.models");

function removePatient(req, res) {
  const { entry_id } = req.params;
  return deleteQueueEntry(entry_id).then(() => {
    res.status(204).send();
  });
}

module.exports = { removePatient };
