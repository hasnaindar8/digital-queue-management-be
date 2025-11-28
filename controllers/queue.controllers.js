const { deleteQueueEntry } = require("../models/queue.models");
const socketService = require("../services/socketService.js");

function removePatient(req, res) {
  const { entry_id, user_id } = req.params;
  return deleteQueueEntry(entry_id)
    .then(() => {
      socketService.removeUserFromSockets(Number(user_id));

      return socketService.broadcastQueueUpdate();
    })
    .then(() => {
      res.status(204).send();
    });
}

module.exports = { removePatient };
