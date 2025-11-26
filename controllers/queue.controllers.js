const { deleteQueueEntry } = require("../models/queue.models");

function removeServedPatient(req, res) {
  const { entry_id } = req.params;
    return deleteQueueEntry(entry_id).then(() => {
    res.status(204).send();
  });
};

module.exports = { removeServedPatient };
